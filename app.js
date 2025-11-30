// Invoice Data Model
const invoiceData = {
    logo: null,
    business: {
        name: '',
        address: '',
        email: '',
        phone: ''
    },
    client: {
        name: '',
        address: '',
        email: '',
        phone: ''
    },
    invoiceNumber: '',
    invoiceDate: '',
    lineItems: [],
    taxPercentage: 0,
    subtotal: 0,
    taxAmount: 0,
    total: 0
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    addLineItem(); // Add one default line item
});

function initializeApp() {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
    invoiceData.invoiceDate = today;
    renderInvoicePreview();
}

function setupEventListeners() {
    // Logo upload
    document.getElementById('logoUpload').addEventListener('change', handleLogoUpload);

    // Business information
    document.getElementById('businessName').addEventListener('input', (e) => {
        invoiceData.business.name = e.target.value;
        renderInvoicePreview();
    });
    document.getElementById('businessAddress').addEventListener('input', (e) => {
        invoiceData.business.address = e.target.value;
        renderInvoicePreview();
    });
    document.getElementById('businessEmail').addEventListener('input', (e) => {
        invoiceData.business.email = e.target.value;
        renderInvoicePreview();
    });
    document.getElementById('businessPhone').addEventListener('input', (e) => {
        invoiceData.business.phone = e.target.value;
        renderInvoicePreview();
    });

    // Client information
    document.getElementById('clientName').addEventListener('input', (e) => {
        invoiceData.client.name = e.target.value;
        renderInvoicePreview();
    });
    document.getElementById('clientAddress').addEventListener('input', (e) => {
        invoiceData.client.address = e.target.value;
        renderInvoicePreview();
    });
    document.getElementById('clientEmail').addEventListener('input', (e) => {
        invoiceData.client.email = e.target.value;
        renderInvoicePreview();
    });
    document.getElementById('clientPhone').addEventListener('input', (e) => {
        invoiceData.client.phone = e.target.value;
        renderInvoicePreview();
    });

    // Invoice metadata
    document.getElementById('invoiceNumber').addEventListener('input', (e) => {
        invoiceData.invoiceNumber = e.target.value;
        renderInvoicePreview();
    });
    document.getElementById('invoiceDate').addEventListener('input', (e) => {
        invoiceData.invoiceDate = e.target.value;
        renderInvoicePreview();
    });

    // Tax percentage
    document.getElementById('taxPercentage').addEventListener('input', (e) => {
        invoiceData.taxPercentage = parseFloat(e.target.value) || 0;
        calculateTotals();
        renderInvoicePreview();
    });

    // Action buttons
    document.getElementById('addItemBtn').addEventListener('click', addLineItem);
    document.getElementById('downloadPdfBtn').addEventListener('click', generatePDF);
    document.getElementById('printBtn').addEventListener('click', printInvoice);
}

// Logo Upload Handler
function handleLogoUpload(event) {
    const file = event.target.files[0];
    
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a PNG, JPG, or SVG file.');
        event.target.value = '';
        return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        alert('File size must be less than 5MB.');
        event.target.value = '';
        return;
    }

    // Read and convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
        invoiceData.logo = e.target.result;
        renderInvoicePreview();
    };
    reader.onerror = () => {
        alert('Error reading file. Please try again.');
    };
    reader.readAsDataURL(file);
}

// Line Items Management
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function addLineItem() {
    const id = generateUniqueId();
    const lineItem = {
        id: id,
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0
    };

    invoiceData.lineItems.push(lineItem);
    renderLineItemInputs();
    calculateTotals();
    renderInvoicePreview();
}

function removeLineItem(id) {
    invoiceData.lineItems = invoiceData.lineItems.filter(item => item.id !== id);
    renderLineItemInputs();
    calculateTotals();
    renderInvoicePreview();
}

function updateLineItem(id, field, value) {
    const item = invoiceData.lineItems.find(item => item.id === id);
    if (!item) return;

    if (field === 'quantity' || field === 'rate') {
        item[field] = parseFloat(value) || 0;
        item.amount = calculateLineItemAmount(item);
    } else {
        item[field] = value;
    }

    calculateTotals();
    renderInvoicePreview();
}

function renderLineItemInputs() {
    const container = document.getElementById('lineItemsContainer');
    container.innerHTML = '';

    invoiceData.lineItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'line-item';
        itemDiv.innerHTML = `
            <input type="text" placeholder="Description" value="${item.description}" 
                   onchange="updateLineItem('${item.id}', 'description', this.value)">
            <div class="line-item-row">
                <input type="number" placeholder="Quantity" value="${item.quantity}" min="0" step="1"
                       onchange="updateLineItem('${item.id}', 'quantity', this.value)">
                <input type="number" placeholder="Rate" value="${item.rate}" min="0" step="0.01"
                       onchange="updateLineItem('${item.id}', 'rate', this.value)">
                <input type="text" placeholder="Amount" value="${formatCurrency(item.amount)}" disabled>
            </div>
            <div class="line-item-actions">
                <button class="btn btn-danger" onclick="removeLineItem('${item.id}')">Remove</button>
            </div>
        `;
        container.appendChild(itemDiv);
    });
}

// Calculation Functions
function calculateLineItemAmount(item) {
    return Math.round(item.quantity * item.rate * 100) / 100;
}

function calculateSubtotal() {
    return invoiceData.lineItems.reduce((sum, item) => sum + item.amount, 0);
}

function calculateTax() {
    return Math.round(invoiceData.subtotal * (invoiceData.taxPercentage / 100) * 100) / 100;
}

function calculateTotal() {
    return Math.round((invoiceData.subtotal + invoiceData.taxAmount) * 100) / 100;
}

function calculateTotals() {
    invoiceData.subtotal = calculateSubtotal();
    invoiceData.taxAmount = calculateTax();
    invoiceData.total = calculateTotal();
}

// Formatting Functions
function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Invoice Preview Rendering
function renderInvoicePreview() {
    // Logo
    const logoImg = document.getElementById('previewLogo');
    if (invoiceData.logo) {
        logoImg.src = invoiceData.logo;
        logoImg.style.display = 'block';
    } else {
        logoImg.style.display = 'none';
    }

    // Business information
    document.getElementById('previewBusinessName').textContent = invoiceData.business.name;
    document.getElementById('previewBusinessAddress').textContent = invoiceData.business.address;
    document.getElementById('previewBusinessEmail').textContent = invoiceData.business.email;
    document.getElementById('previewBusinessPhone').textContent = invoiceData.business.phone;

    // Hide empty business fields
    toggleVisibility('previewBusinessName', invoiceData.business.name);
    toggleVisibility('previewBusinessAddress', invoiceData.business.address);
    toggleVisibility('previewBusinessEmail', invoiceData.business.email);
    toggleVisibility('previewBusinessPhone', invoiceData.business.phone);

    // Client information
    document.getElementById('previewClientName').textContent = invoiceData.client.name;
    document.getElementById('previewClientAddress').textContent = invoiceData.client.address;
    document.getElementById('previewClientEmail').textContent = invoiceData.client.email;
    document.getElementById('previewClientPhone').textContent = invoiceData.client.phone;

    // Hide empty client fields
    toggleVisibility('previewClientName', invoiceData.client.name);
    toggleVisibility('previewClientAddress', invoiceData.client.address);
    toggleVisibility('previewClientEmail', invoiceData.client.email);
    toggleVisibility('previewClientPhone', invoiceData.client.phone);

    // Invoice metadata
    document.getElementById('previewInvoiceNumber').textContent = invoiceData.invoiceNumber || '-';
    document.getElementById('previewInvoiceDate').textContent = formatDate(invoiceData.invoiceDate);

    // Line items
    renderLineItemsPreview();

    // Totals
    document.getElementById('previewSubtotal').textContent = formatCurrency(invoiceData.subtotal);
    document.getElementById('previewTaxPercentage').textContent = invoiceData.taxPercentage.toFixed(2);
    document.getElementById('previewTaxAmount').textContent = formatCurrency(invoiceData.taxAmount);
    document.getElementById('previewTotal').textContent = formatCurrency(invoiceData.total);
}

function renderLineItemsPreview() {
    const tbody = document.getElementById('previewLineItems');
    
    if (invoiceData.lineItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No items added yet</td></tr>';
        return;
    }

    tbody.innerHTML = invoiceData.lineItems.map(item => `
        <tr>
            <td>${item.description || '-'}</td>
            <td>${item.quantity}</td>
            <td>${formatCurrency(item.rate)}</td>
            <td>${formatCurrency(item.amount)}</td>
        </tr>
    `).join('');
}

function toggleVisibility(elementId, value) {
    const element = document.getElementById(elementId);
    element.style.display = value ? 'block' : 'none';
}

// PDF Generation
async function generatePDF() {
    try {
        const { jsPDF } = window.jspdf;
        const invoice = document.getElementById('invoicePreview');
        
        // Create canvas from invoice preview
        const canvas = await html2canvas(invoice, {
            scale: 2,
            useCORS: true,
            logging: false
        });

        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        // Generate filename
        const filename = invoiceData.invoiceNumber 
            ? `Invoice-${invoiceData.invoiceNumber}.pdf`
            : `Invoice-${Date.now()}.pdf`;
        
        // Download
        pdf.save(filename);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
    }
}

// Print Function
function printInvoice() {
    window.print();
}

// Make functions globally accessible for inline event handlers
window.updateLineItem = updateLineItem;
window.removeLineItem = removeLineItem;
