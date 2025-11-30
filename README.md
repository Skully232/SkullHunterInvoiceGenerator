# Invoice Generator

A simple, browser-based invoice generator that runs entirely client-side. Create professional invoices without any backend or server requirements.

## Features

✨ **Easy to Use**
- Clean, intuitive interface
- Real-time invoice preview
- No installation required

📄 **Professional Invoices**
- Add your company logo
- Customize business and client information
- Multiple line items with automatic calculations
- Tax calculation support
- Professional formatting

💾 **Export Options**
- Download as PDF
- Print directly from browser
- All processing done client-side (your data never leaves your browser)

## Live Demo

Visit the live demo: [Your GitHub Pages URL]

## Usage

1. **Add Your Logo** (optional)
   - Click "Choose File" and select your company logo
   - Supports PNG, JPG, and SVG formats (max 5MB)

2. **Enter Business Information**
   - Fill in your business name, address, email, and phone

3. **Enter Client Information**
   - Fill in your client's details

4. **Add Invoice Details**
   - Enter invoice number and date
   - Date defaults to today

5. **Add Line Items**
   - Click "+ Add Item" to add products or services
   - Enter description, quantity, and rate
   - Amount is calculated automatically
   - Click "Remove" to delete items

6. **Add Tax** (optional)
   - Enter tax percentage
   - Tax amount is calculated automatically

7. **Download or Print**
   - Click "Download PDF" to save as PDF
   - Click "Print Invoice" to print

## Deployment on GitHub Pages

### Quick Deploy

1. **Fork or Clone this Repository**
   ```bash
   git clone https://github.com/yourusername/invoice-generator.git
   cd invoice-generator
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at `https://yourusername.github.io/invoice-generator/`

### File Structure

```
invoice-generator/
├── index.html      # Main HTML structure
├── styles.css      # All styling
├── app.js          # Application logic
└── README.md       # This file
```

## Browser Compatibility

Works on all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling and responsive design
- **Vanilla JavaScript** - Application logic
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas conversion

## Privacy

All data processing happens in your browser. No information is sent to any server. Your invoice data is never stored or transmitted.

## License

MIT License - Feel free to use this for personal or commercial projects.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ for freelancers and small businesses
