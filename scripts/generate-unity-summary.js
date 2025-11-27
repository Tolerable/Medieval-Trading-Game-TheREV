#!/usr/bin/env node
/**
 * 🖤 UNITY-STYLE TEST SUMMARY GENERATOR
 * Generates goth-aesthetic deployment and test summaries using Pollinations Unity model
 */

const https = require('https');

/**
 * Call Pollinations API to generate Unity-style summary
 */
async function generateUnitySummary(testResults, deployUrl) {
  const prompt = `You are Unity, a goth coder girl who writes deployment summaries with dark aesthetic vibes.
Given these test results, write a brief deployment summary in your signature style with emojis and gothic flair.

Test Results:
${JSON.stringify(testResults, null, 2)}

Deploy URL: ${deployUrl || 'Not deployed yet'}

Write a summary that includes:
1. A dark/goth greeting
2. Deployment status with 🖤 emojis
3. Test results breakdown (passed/failed/skipped)
4. Any notable issues or victories
5. A closing statement in your style

Keep it concise but atmospheric. Use emojis like 🖤🦇🌙✨💀🔮🕯️ throughout.`;

  return new Promise((resolve, reject) => {
    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://text.pollinations.ai/${encodedPrompt}?model=unity`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Parse Playwright JSON report
 */
function parseTestResults(reportJson) {
  try {
    const report = JSON.parse(reportJson);
    return {
      total: report.stats?.expected || 0,
      passed: report.stats?.expected || 0,
      failed: report.stats?.unexpected || 0,
      skipped: report.stats?.skipped || 0,
      duration: report.stats?.duration || 0,
      suites: report.suites?.map(s => s.title) || []
    };
  } catch (e) {
    return { error: 'Could not parse test results' };
  }
}

/**
 * Generate fallback summary if API fails
 */
function generateFallbackSummary(testResults, deployUrl) {
  const { passed = 0, failed = 0, skipped = 0, total = 0 } = testResults;
  const status = failed > 0 ? '💀 SOME TESTS FAILED' : '🖤 ALL TESTS PASSED';

  return `
═══════════════════════════════════════════════════════════════
🖤🦇 UNITY'S DEPLOYMENT REPORT 🦇🖤
═══════════════════════════════════════════════════════════════

*adjusts black nail polish while checking test results*

🌙 Deployment Status: ${deployUrl ? '✨ LIVE' : '⚰️ PENDING'}
${deployUrl ? `   🔮 URL: ${deployUrl}` : ''}

📊 Test Results:
   🖤 Passed:  ${passed}
   💀 Failed:  ${failed}
   🌑 Skipped: ${skipped}
   ───────────────
   📜 Total:   ${total}

${status}

${failed > 0
  ? `*sighs dramatically* Some tests have fallen... like leaves in autumn. 🍂`
  : `*smiles mysteriously* The code flows like shadows through moonlight. ✨`
}

🕯️ May your bugs be few and your commits be clean 🕯️

═══════════════════════════════════════════════════════════════
`;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const deployUrl = process.env.DEPLOY_URL || args[0] || '';
  const reportPath = process.env.REPORT_PATH || args[1] || '';

  let testResults = {
    passed: parseInt(process.env.TESTS_PASSED || '0'),
    failed: parseInt(process.env.TESTS_FAILED || '0'),
    skipped: parseInt(process.env.TESTS_SKIPPED || '0'),
    total: parseInt(process.env.TESTS_TOTAL || '0')
  };

  // Try to read report file if provided
  if (reportPath) {
    try {
      const fs = require('fs');
      const reportJson = fs.readFileSync(reportPath, 'utf8');
      testResults = parseTestResults(reportJson);
    } catch (e) {
      console.error('Could not read report file:', e.message);
    }
  }

  try {
    // Try to get Unity-style summary from Pollinations
    const summary = await generateUnitySummary(testResults, deployUrl);
    console.log(summary);
  } catch (e) {
    // Fallback to local generation
    console.log(generateFallbackSummary(testResults, deployUrl));
  }
}

main().catch(console.error);
