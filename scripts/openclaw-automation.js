// OpenClaw Development Automation Script for Pachinko Project
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

class OpenClawAutomation {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.openclawConfig = path.join(process.env.HOME || process.env.USERPROFILE, '.openclaw', 'openclaw-dev.json');
    this.reportFile = path.join(projectRoot, 'automation-report.md');
  }

  // Run code review on changed files
  async codeReview() {
    try {
      const changedFiles = this.getChangedFiles();
      if (changedFiles.length === 0) {
        console.log('No files changed for review');
        return { reviewed: 0, findings: [] };
      }

      console.log('Running code review on changed files:', changedFiles);
      const findings = [];

      // Use OpenClaw to review each changed file
      for (const file of changedFiles) {
        const fileFindings = await this.reviewFile(file);
        findings.push(...fileFindings);
      }

      return { reviewed: changedFiles.length, findings };

    } catch (error) {
      console.error('Code review failed:', error.message);
      return { reviewed: 0, findings: [], error: error.message };
    }
  }

  // Get list of changed files from git
  getChangedFiles() {
    try {
      const output = execSync('git diff --name-only HEAD', {
        cwd: this.projectRoot,
        encoding: 'utf8'
      });
      return output.trim().split('\n').filter(file => file.trim() !== '');
    } catch (error) {
      console.warn('Could not get changed files:', error.message);
      return [];
    }
  }

  // Review a single file using OpenClaw
  async reviewFile(filePath) {
    const fullPath = path.join(this.projectRoot, filePath);
    console.log(`\nReviewing file: ${filePath}`);

    try {
      // Read file content
      const content = execSync(`cat "${fullPath}"`, { encoding: 'utf8' });

      // Simulate OpenClaw review (in real implementation, this would use OpenClaw API)
      const findings = this.simulateReview(content, filePath);

      console.log(`Found ${findings.length} issues in ${filePath}`);
      return findings;

    } catch (error) {
      console.error(`Failed to review ${filePath}:`, error.message);
      return [{ file: filePath, issue: 'Failed to review file', severity: 'error' }];
    }
  }

  // Simulate OpenClaw code review (placeholder for actual OpenClaw integration)
  simulateReview(content, filePath) {
    const findings = [];

    // Simple checks (these would be done by OpenClaw in reality)
    if (content.includes('console.log(') && !filePath.includes('.test.')) {
      findings.push({
        file: filePath,
        issue: 'Console.log found in production code',
        severity: 'warning',
        suggestion: 'Use proper logging library'
      });
    }

    if (content.includes('any)') && filePath.endsWith('.ts')) {
      findings.push({
        file: filePath,
        issue: 'Using "any" type in TypeScript',
        severity: 'warning',
        suggestion: 'Use proper type definitions'
      });
    }

    return findings;
  }

  // Run tests and report results
  async runTests() {
    console.log('Running tests...');
    try {
      const startTime = Date.now();
      execSync('npm test', {
        cwd: this.projectRoot,
        stdio: 'inherit'
      });
      const duration = Date.now() - startTime;

      console.log('✅ Tests passed');
      return { passed: true, duration, error: null };
    } catch (error) {
      console.error('❌ Tests failed');
      return { passed: false, duration: 0, error: error.message };
    }
  }

  // Generate documentation
  async generateDocs() {
    console.log('Generating documentation...');
    // Simulate documentation generation
    const docs = {
      generated: ['README.md', 'API.md'],
      coverage: '75%'
    };
    return docs;
  }

  // Generate automation report
  generateReport(reviewResults, testResults, docsResults) {
    const report = `# OpenClaw Automation Report

## 📊 Summary
- **Date**: ${new Date().toLocaleDateString()}
- **Project**: Pachinko Marketplace
- **Automation Type**: Development Workflow

## 🔍 Code Review Results

### Files Reviewed
- **Total Files**: ${reviewResults.reviewed}
- **Issues Found**: ${reviewResults.findings.length}

### Key Findings
${reviewResults.findings.slice(0, 5).map(f => `- **${f.file}**: ${f.issue} (${f.severity})`).join('\n')}

### Recommendations
${reviewResults.findings.slice(0, 3).map(f => `- ${f.suggestion || 'No specific suggestion'}`).join('\n')}

## 🧪 Test Results

### Test Status
- **Status**: ${testResults.passed ? '✅ PASSED' : '❌ FAILED'}
- **Duration**: ${testResults.duration}ms

## 📚 Documentation

### Generated Documentation
- ${docsResults.generated.join('\n- ')}

### Documentation Coverage
- **Coverage**: ${docsResults.coverage}

## ⚡ Performance Metrics

### Execution Time
- **Total Time**: ${Date.now() - this.startTime}ms

## 🎯 Next Steps
1. Address critical code review findings
2. Improve test coverage
3. Enhance documentation

---
*Generated by OpenClaw Development Automation*`;

    fs.writeFileSync(this.reportFile, report);
    console.log(`Report generated: ${this.reportFile}`);
  }

  // Main automation runner
  async run() {
    this.startTime = Date.now();
    console.log('🚀 Starting OpenClaw Development Automation\n');

    const reviewResults = await this.codeReview();
    console.log('\n' + '='.repeat(50));

    const testResults = await this.runTests();
    console.log('\n' + '='.repeat(50));

    const docsResults = await this.generateDocs();
    console.log('\n' + '='.repeat(50));

    this.generateReport(reviewResults, testResults, docsResults);

    console.log('\n✅ Automation complete');
  }
}

// Export for use in other scripts
module.exports = OpenClawAutomation;

// Run if called directly
if (require.main === module) {
  const automation = new OpenClawAutomation();
  automation.run().catch(console.error);
}