# How to Add New Blog Posts

## Quick Start

Adding a new blog post is easy! Just create a Markdown file in the `_posts` folder with the correct naming format.

## Step-by-Step Guide

### 1. Create a New Markdown File

Blog posts must be named with this exact format:

```
YYYY-MM-DD-your-post-title.md
```

**Examples:**
- `2025-01-20-how-to-automate-customer-service.md`
- `2025-02-05-top-10-ai-tools-for-small-business.md`

**Location:** Place the file in the `_posts` folder

### 2. Add Front Matter

Every blog post needs "front matter" at the top with metadata. Copy this template:

```yaml
---
layout: post
title: "Your Blog Post Title"
description: "A brief summary of your post (shown in listings and SEO)"
date: 2025-01-20
author: "Polaris AI Studio Team"
tags: [AI Automation, Small Business, Case Study]
reading_time: 5
image: /logo.png
---
```

**Field Descriptions:**
- `title`: The main headline (appears at top of post)
- `description`: SEO description & preview text (150-160 characters recommended)
- `date`: Publish date in YYYY-MM-DD format
- `author`: Your name or "Polaris AI Studio Team"
- `tags`: Array of relevant tags (used for categorization)
- `reading_time`: Estimated minutes to read (optional)
- `image`: Featured image path (optional, defaults to logo.png)

### 3. Write Your Content in Markdown

After the front matter (after the second `---`), write your post in Markdown.

**Markdown Basics:**

```markdown
## Main Heading

This is a paragraph. You can include **bold text** and *italic text*.

### Subheading

Here's a numbered list:
1. First item
2. Second item
3. Third item

Here's a bullet list:
- Point one
- Point two
- Point three

Here's a link: [Link text](https://example.com)

Here's an image:
![Alt text](/path/to/image.jpg)

Here's a quote:
> This is a blockquote

Here's inline code: `code example`

Here's a code block:
```python
def hello():
    print("Hello, World!")
```
```

### 4. Preview Your Post Locally (Optional)

If you want to preview before publishing:

```bash
# Install Jekyll (one-time setup)
gem install bundler jekyll

# Serve locally
cd polarisaistudio.github.io
jekyll serve

# View at http://localhost:4000
```

### 5. Publish Your Post

Simply commit and push to GitHub:

```bash
git add _posts/2025-01-20-your-new-post.md
git commit -m "Add blog post: Your Post Title"
git push origin main
```

GitHub Pages will automatically build and publish your post within 1-2 minutes!

## Complete Example Post

Create file: `_posts/2025-01-25-5-ways-ai-saves-time.md`

```markdown
---
layout: post
title: "5 Ways AI Automation Saves Small Businesses 20+ Hours Per Week"
description: "Discover the top 5 automation strategies that help small businesses reclaim their time and focus on growth instead of busywork."
date: 2025-01-25
author: "Sarah Chen"
tags: [Productivity, AI Automation, Time Management]
reading_time: 6
image: /logo.png
---

## Introduction

Running a small business means wearing multiple hats. But what if AI could take some of those hats off your plate?

In this post, we'll explore 5 proven ways AI automation helps small business owners save 20+ hours every single week.

## 1. Automated Customer Support

Stop answering the same questions over and over...

[Continue writing your content...]

## Conclusion

AI automation isn't the future—it's available right now...

---

**Ready to automate your business?** [Schedule a free consultation](https://calendly.com/polarisaistudio/introduction-call)
```

## Tips for Great Blog Posts

### SEO Best Practices

1. **Use descriptive titles** (50-60 characters)
2. **Write compelling descriptions** (150-160 characters)
3. **Include relevant tags** (3-5 tags per post)
4. **Use headings** (H2, H3) to structure content
5. **Add internal links** to your services/case studies
6. **Include CTAs** (calls-to-action) at the end

### Content Ideas

- **How-to guides**: "How to Automate Your Salon Bookings"
- **Case studies**: "How a Local Clinic Saved $30K with AI"
- **List posts**: "7 Signs Your Business Needs Automation"
- **Comparisons**: "AI Chatbots vs. Hiring More Staff"
- **Industry-specific**: "AI for Real Estate Agents: Complete Guide"
- **Myth-busting**: "5 AI Automation Myths (Debunked)"

### Writing Style

- **Be conversational** - Write like you're talking to a friend
- **Use examples** - Real scenarios resonate more than theory
- **Include numbers** - "Save 15 hours/week" is better than "Save time"
- **Break up text** - Use headings, lists, and short paragraphs
- **Add CTAs** - Always include next steps at the end

## Formatting Options

### Images

```markdown
![Image description](/path/to/image.jpg)
```

Place images in root directory or create an `/images` folder.

### Code Blocks with Syntax Highlighting

```markdown
```python
def automate_task():
    return "Automated!"
```
```

Supported languages: python, javascript, ruby, html, css, and more.

### Callout Boxes (Using Blockquotes)

```markdown
> **💡 Pro Tip:** Start with one automation and expand from there.
```

### Embedded Videos

```markdown
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
```

## Troubleshooting

### Post Not Showing Up?

1. **Check the date** - Posts dated in the future won't display
2. **Verify filename format** - Must be `YYYY-MM-DD-title.md`
3. **Check front matter** - Must have opening and closing `---`
4. **Wait 2-3 minutes** - GitHub Pages takes time to rebuild

### Formatting Issues?

1. **Validate YAML** - Use [YAML Validator](http://www.yamllint.com/)
2. **Check Markdown** - Use [Markdown Preview](https://markdownlivepreview.com/)
3. **Review spacing** - Ensure blank line between heading and content

## Need Help?

- **Jekyll Documentation**: https://jekyllrb.com/docs/posts/
- **Markdown Guide**: https://www.markdownguide.org/
- **Questions?** Contact the team at info@polarisaistudio.com

---

**Happy blogging!** 🚀
