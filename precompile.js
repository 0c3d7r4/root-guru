const fs = require('fs');
const path = require('path');

// Directory to store the generated static pages
const outputDir = path.join(__dirname, 'docs');

// Ensure the docs directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// List of available templates and content
const templates = ['index2'];
// const templates = ['index2'];
var contents=['rucode']
// const contents = ['features', 'rucode', 'rucode-0'];

const readPageWithContent = (template, content) => {
  let html = fs.readFileSync(path.join(__dirname, 'pages', template + '.html'), 'utf-8');
  let contentHtml = '';

  if (content) {
    try {
      contentHtml = fs.readFileSync(path.join(__dirname, 'content', content + '.html'), 'utf-8');
    } catch (er) {
      console.error(`Error loading content: ${content}.html`);
      contentHtml = 'Failed to load content';
    }
  }

  if (contentHtml) {
    if (!html.includes('{CONTENT}')) {
      console.warn('Template does not have {CONTENT} placeholder');
    } else {
      html = html.replace(/{CONTENT}/, contentHtml);
    }
  }

  return html;
};

// Function to generate all the pages
const generatePages = () => {
  // Generate index.html with 'features' content
  templates.forEach((template) => {
    contents.forEach((content) => {
      const outputPath = path.join(outputDir, `${template}-${content}.html`);
      const pageHtml = readPageWithContent(template, content);

      // Write the page to the docs directory
      fs.writeFileSync(outputPath, pageHtml, 'utf-8');
      console.log(`Generated: ${outputPath}`);
    });
  });
};

// Run the page generation
generatePages();
