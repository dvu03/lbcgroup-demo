require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

// Replicate the isSafeIconUrl logic from DynamicIcon.tsx to verify security guarantees
function testIsSafeIconUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.length > 200000) return false;
  const lower = trimmed.toLowerCase();
  
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('data:text/html') ||
    lower.startsWith('data:application/javascript')
  ) {
    return false;
  }

  if (
    lower.includes('<script') ||
    lower.includes('onload=') ||
    lower.includes('onerror=') ||
    lower.includes('onclick=') ||
    lower.includes('javascript:')
  ) {
    return false;
  }

  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('./')
  ) {
    return true;
  }

  if (lower.startsWith('data:image/')) {
    return true;
  }

  return false;
}

(async () => {
  let passed = 0;
  let failed = 0;

  function assert(desc, condition) {
    if (condition) {
      console.log(`  ✓ PASS: ${desc}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${desc}`);
      failed++;
    }
  }

  console.log("\n========================================================");
  console.log("SUITE 1: SVG & ICON URL SECURITY SANITIZATION AUDIT");
  console.log("========================================================");

  // 1. Malicious payloads must be rejected
  assert("Reject javascript: scheme", !testIsSafeIconUrl("javascript:alert(1)"));
  assert("Reject javascript: with mixed case", !testIsSafeIconUrl("JaVaScRiPt:alert(document.cookie)"));
  assert("Reject vbscript: scheme", !testIsSafeIconUrl("vbscript:msgbox(1)"));
  assert("Reject data:text/html with XSS payload", !testIsSafeIconUrl("data:text/html,<script>alert(1)</script>"));
  assert("Reject SVG with inline script tag", !testIsSafeIconUrl("https://evil.com/x.svg?<script>steal()</script>"));
  assert("Reject URL with onload= event handler", !testIsSafeIconUrl("https://evil.com/test.svg?onload=alert(1)"));
  assert("Reject URL with onerror= event handler", !testIsSafeIconUrl("/uploads/badge.svg?onerror=alert(1)"));

  // 2. Safe payloads must be accepted
  assert("Accept https:// URL image", testIsSafeIconUrl("https://images.unsplash.com/photo-123456?w=200"));
  assert("Accept local relative path", testIsSafeIconUrl("/icons/clinic-shield.svg"));
  assert("Accept safe data:image/png base64", testIsSafeIconUrl("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="));
  assert("Accept safe data:image/svg+xml", testIsSafeIconUrl("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 2L2 7l10 5 10-5-10-5z'/></svg>"));

  console.log("\n========================================================");
  console.log("SUITE 2: NEON DATABASE REPOSITORY INTEGRITY AUDIT");
  console.log("========================================================");

  // 1. Check productCategories in Neon
  const catRows = await sql`SELECT data FROM cms_content WHERE key = 'productCategories'`;
  assert("cms_content contains productCategories record", catRows.length === 1);
  const categories = catRows[0]?.data || [];
  assert("productCategories contains at least 5 categories", categories.length >= 5);
  
  const sampleCat = categories[0];
  assert("Category has stable 'id' identifier", !!sampleCat?.id);
  assert("Category has 'slug' URL slug", !!sampleCat?.slug);
  assert("Category has 'name' display name", !!sampleCat?.name);
  assert("Category has 'iconName' (Lucide icon identifier)", !!sampleCat?.iconName);

  // 2. Test saving and updating an icon without mutating slug or id
  console.log("\n- Testing updating category icon in Neon DB...");
  const originalIconName = sampleCat.iconName;
  sampleCat.iconName = "Sparkles"; // change icon temporarily
  await sql`UPDATE cms_content SET data = ${JSON.stringify(categories)}::jsonb, updated_at = NOW() WHERE key = 'productCategories'`;
  
  const reloadedCat = await sql`SELECT data FROM cms_content WHERE key = 'productCategories'`;
  assert("Category icon updated in Neon successfully", reloadedCat[0].data[0].iconName === "Sparkles");
  assert("Category ID remained unchanged", reloadedCat[0].data[0].id === sampleCat.id);
  assert("Category Slug remained unchanged", reloadedCat[0].data[0].slug === sampleCat.slug);

  // Restore original icon
  sampleCat.iconName = originalIconName;
  await sql`UPDATE cms_content SET data = ${JSON.stringify(categories)}::jsonb, updated_at = NOW() WHERE key = 'productCategories'`;
  console.log("  -> Restored original category icon successfully.");

  // 3. Check siteConfig.backToTop in Neon
  console.log("\n- Checking siteConfig.backToTop in Neon DB...");
  const siteConfigRows = await sql`SELECT data FROM cms_content WHERE key = 'siteConfig'`;
  assert("cms_content contains siteConfig record", siteConfigRows.length === 1);
  const siteConfig = siteConfigRows[0]?.data || {};
  assert("siteConfig contains backToTop configuration", !!siteConfig.backToTop);
  
  const btt = siteConfig.backToTop;
  assert("backToTop has 'enabled' boolean", typeof btt.enabled === 'boolean');
  assert("backToTop has 'iconName' string", typeof btt.iconName === 'string');
  assert("backToTop has 'position' (bottom-right/bottom-left)", ['bottom-right', 'bottom-left'].includes(btt.position));
  assert("backToTop desktop bottom offset >= 80px (clears floating contact)", btt.bottomOffsetDesktop >= 80);
  assert("backToTop mobile bottom offset >= 60px (clears mobile nav)", btt.bottomOffsetMobile >= 60);
  assert("backToTop scrollThreshold configured (> 100px)", btt.scrollThreshold >= 100);
  assert("backToTop color styling configured", !!btt.backgroundColor && !!btt.iconColor);

  console.log("\n========================================================");
  console.log("SUITE 3: SPECIALTIES & SERVICES DYNAMIC ICON AUDIT");
  console.log("========================================================");

  const specRows = await sql`SELECT data FROM cms_content WHERE key = 'specialties'`;
  assert("Specialties record exists in Neon", specRows.length === 1);
  const specialties = specRows[0]?.data || [];
  assert("Specialties count is 5", specialties.length === 5);
  assert("All specialties have iconName", specialties.every(s => !!s.iconName));

  const srvRows = await sql`SELECT data FROM cms_content WHERE key = 'services'`;
  assert("Services record exists in Neon", srvRows.length === 1);
  const services = srvRows[0]?.data || [];
  assert("Services count is at least 9", services.length >= 9);
  assert("All services have iconName", services.every(s => !!s.iconName));

  console.log("\n========================================================");
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("========================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
})();
