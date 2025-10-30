import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Shopping & Orders
  {
    category: 'Shopping & Orders',
    question: 'How do I place an order?',
    answer: 'Browse our products, add items to your cart, and proceed to checkout. You\'ll need to create an account or log in, then provide shipping information and payment details to complete your order.',
  },
  {
    category: 'Shopping & Orders',
    question: 'Can I modify or cancel my order?',
    answer: 'You can modify or cancel your order within 1 hour of placing it. Go to your Orders page, select the order, and click "Cancel Order". For modifications, please cancel and place a new order.',
  },
  {
    category: 'Shopping & Orders',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and PayPal. All payments are processed securely through our encrypted payment gateway.',
  },
  {
    category: 'Shopping & Orders',
    question: 'Do you offer gift wrapping?',
    answer: 'Yes! During checkout, you can select gift wrapping for an additional $5 per item. You can also include a personalized message card.',
  },

  // Shipping & Delivery
  {
    category: 'Shipping & Delivery',
    question: 'What are your shipping options?',
    answer: 'We offer Standard Shipping (5-7 business days - FREE on orders over $100), Express Shipping (2-3 business days - $15), and Next Day Delivery (1 business day - $25).',
  },
  {
    category: 'Shipping & Delivery',
    question: 'Do you ship internationally?',
    answer: 'Currently, we ship to the United States, Canada, United Kingdom, and Australia. International shipping rates are calculated at checkout based on destination and weight.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and visiting the Orders page.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'What if my package is lost or damaged?',
    answer: 'If your package is lost or arrives damaged, please contact our support team within 48 hours with photos. We\'ll arrange a replacement or full refund immediately.',
  },

  // Returns & Refunds
  {
    category: 'Returns & Refunds',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy on most items. Products must be unused, in original packaging, and with all tags attached. Electronics have a 14-day return window.',
  },
  {
    category: 'Returns & Refunds',
    question: 'How do I return an item?',
    answer: 'Go to your Orders page, select the item you want to return, and click "Request Return". Print the prepaid shipping label and drop off at any authorized shipping location.',
  },
  {
    category: 'Returns & Refunds',
    question: 'When will I receive my refund?',
    answer: 'Refunds are processed within 5-7 business days after we receive your return. The refund will be credited to your original payment method.',
  },
  {
    category: 'Returns & Refunds',
    question: 'Can I exchange an item?',
    answer: 'Yes! Select "Exchange" instead of "Return" when requesting a return. Choose your preferred replacement, and we\'ll ship it as soon as we receive your original item.',
  },

  // Account & Privacy
  {
    category: 'Account & Privacy',
    question: 'How do I create an account?',
    answer: 'Click the user icon in the top right corner and select "Register". Fill in your name, email, and create a password. You\'ll receive a confirmation email to verify your account.',
  },
  {
    category: 'Account & Privacy',
    question: 'Is my personal information secure?',
    answer: 'Absolutely! We use industry-standard SSL encryption to protect your data. We never share your information with third parties without your consent. Read our Privacy Policy for details.',
  },
  {
    category: 'Account & Privacy',
    question: 'How do I reset my password?',
    answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. The link is valid for 24 hours.',
  },
  {
    category: 'Account & Privacy',
    question: 'Can I delete my account?',
    answer: 'Yes. Go to your Account Settings and click "Delete Account". Please note this action is permanent and will remove all your order history and saved information.',
  },

  // Products & Pricing
  {
    category: 'Products & Pricing',
    question: 'Are your product images accurate?',
    answer: 'We strive to display accurate product images and descriptions. However, colors may vary slightly due to screen settings. If you\'re not satisfied, our return policy has you covered.',
  },
  {
    category: 'Products & Pricing',
    question: 'Do you offer price matching?',
    answer: 'Yes! If you find a lower price on an identical item from a competitor, contact us within 7 days of purchase with proof, and we\'ll refund the difference plus 10%.',
  },
  {
    category: 'Products & Pricing',
    question: 'How often do you restock items?',
    answer: 'Most items are restocked weekly. You can click "Notify Me" on out-of-stock products to receive an email when they\'re available again.',
  },
  {
    category: 'Products & Pricing',
    question: 'Do you offer bulk discounts?',
    answer: 'Yes! Orders of 10+ of the same item receive 10% off, 25+ receive 15% off, and 50+ receive 20% off. Contact our business sales team for larger orders.',
  },
];

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(faqs.map((faq) => faq.category)))];
  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter((faq) => faq.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about ShopHub
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFAQs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">
                      {faq.category}
                    </div>
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <CardContent className="px-6 pb-6 pt-0">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:support@shophub.com"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Email Support
              </a>
              <a
                href="tel:1-800-SHOPHUB"
                className="px-6 py-3 bg-background border border-input rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Call: 1-800-SHOPHUB
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
