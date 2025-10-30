import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';

export function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: October 29, 2025</p>
        </div>

        <Card>
          <CardContent className="p-8">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to ShopHub! By accessing or using our website, mobile application, or services
                    (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms").
                    If you do not agree to these Terms, please do not use our Service.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    We reserve the right to modify these Terms at any time. Continued use of the Service after
                    changes are posted constitutes acceptance of the modified Terms.
                  </p>
                </section>

                <Separator />

                {/* Account Registration */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">2. Account Registration</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    To access certain features of the Service, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Keep your password secure and confidential</li>
                    <li>Notify us immediately of any unauthorized access to your account</li>
                    <li>Be responsible for all activities that occur under your account</li>
                    <li>Not share your account credentials with others</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    You must be at least 18 years old to create an account. By registering, you represent that
                    you meet this age requirement.
                  </p>
                </section>

                <Separator />

                {/* Use of Service */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">3. Use of Service</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    You agree to use the Service only for lawful purposes and in accordance with these Terms.
                    You agree NOT to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Use the Service in any way that violates applicable laws or regulations</li>
                    <li>Impersonate any person or entity or misrepresent your affiliation</li>
                    <li>Engage in any fraudulent activity or unauthorized transactions</li>
                    <li>Interfere with or disrupt the Service or servers/networks connected to it</li>
                    <li>Attempt to gain unauthorized access to any part of the Service</li>
                    <li>Use automated systems (bots, scrapers) without our written permission</li>
                    <li>Upload viruses or malicious code</li>
                    <li>Harass, abuse, or harm other users</li>
                  </ul>
                </section>

                <Separator />

                {/* Products and Orders */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">4. Products and Orders</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="leading-relaxed">
                      <strong className="text-foreground">Product Information:</strong> We strive to provide
                      accurate product descriptions, images, and pricing. However, we do not warrant that
                      product descriptions or other content is accurate, complete, or error-free.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-foreground">Pricing:</strong> All prices are in USD and subject
                      to change without notice. We reserve the right to correct pricing errors.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-foreground">Order Acceptance:</strong> Your receipt of an order
                      confirmation does not signify our acceptance of your order. We reserve the right to refuse
                      or cancel any order for any reason.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-foreground">Availability:</strong> Products are subject to
                      availability. If a product becomes unavailable after you order, we will notify you and
                      issue a full refund.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Payment */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">5. Payment Terms</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    By providing payment information, you represent and warrant that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>You are legally authorized to use the payment method</li>
                    <li>The information you provide is true and accurate</li>
                    <li>You will pay all charges at the prices in effect when incurred</li>
                    <li>You authorize us to charge your payment method for all purchases</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    We use third-party payment processors to handle transactions securely. By making a purchase,
                    you agree to their terms of service as well.
                  </p>
                </section>

                <Separator />

                {/* Shipping and Delivery */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">6. Shipping and Delivery</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Shipping times are estimates only and may vary. We are not responsible for delays caused by
                    shipping carriers, customs, or events beyond our control. Title and risk of loss pass to you
                    upon delivery to the carrier.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    You are responsible for providing an accurate shipping address. We are not liable for orders
                    shipped to incorrect addresses provided by you.
                  </p>
                </section>

                <Separator />

                {/* Returns and Refunds */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">7. Returns and Refunds</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Our return policy is as follows:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Most items can be returned within 30 days of delivery</li>
                    <li>Electronics have a 14-day return window</li>
                    <li>Items must be unused, in original packaging, with tags attached</li>
                    <li>Personalized or custom items are not returnable</li>
                    <li>Return shipping costs are the responsibility of the customer unless the item is defective</li>
                    <li>Refunds are processed within 5-7 business days of receiving the return</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    We reserve the right to refuse returns that do not meet our return policy criteria.
                  </p>
                </section>

                <Separator />

                {/* Intellectual Property */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">8. Intellectual Property Rights</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The Service and its original content, features, and functionality are owned by ShopHub and
                    are protected by international copyright, trademark, patent, trade secret, and other
                    intellectual property laws.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    You may not copy, modify, distribute, sell, or lease any part of our Service without our
                    express written permission. Unauthorized use may result in legal action.
                  </p>
                </section>

                <Separator />

                {/* User Content */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">9. User-Generated Content</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By submitting reviews, comments, or other content to the Service, you grant us a worldwide,
                    non-exclusive, royalty-free license to use, reproduce, modify, and display such content.
                    You represent that you own or have the necessary rights to the content you submit.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    We reserve the right to remove any content that violates these Terms or is otherwise
                    objectionable at our sole discretion.
                  </p>
                </section>

                <Separator />

                {/* Disclaimers */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">10. Disclaimers</h2>
                  <p className="text-muted-foreground leading-relaxed uppercase font-semibold mb-3">
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We disclaim all warranties, express or implied, including warranties of merchantability,
                    fitness for a particular purpose, and non-infringement. We do not warrant that the Service
                    will be uninterrupted, secure, or error-free.
                  </p>
                </section>

                <Separator />

                {/* Limitation of Liability */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">11. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To the maximum extent permitted by law, ShopHub shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages, including loss of profits, data,
                    or goodwill, arising from your use of the Service.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Our total liability for any claim arising from these Terms shall not exceed the amount you
                    paid us in the 12 months preceding the claim.
                  </p>
                </section>

                <Separator />

                {/* Indemnification */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">12. Indemnification</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You agree to indemnify and hold harmless ShopHub, its officers, directors, employees, and
                    agents from any claims, damages, losses, liabilities, and expenses (including attorney fees)
                    arising from your violation of these Terms or your use of the Service.
                  </p>
                </section>

                <Separator />

                {/* Termination */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">13. Termination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may terminate or suspend your account and access to the Service immediately, without
                    prior notice, for any reason, including breach of these Terms. Upon termination, your right
                    to use the Service will cease immediately.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    You may terminate your account at any time by contacting us or using the account deletion
                    feature in your account settings.
                  </p>
                </section>

                <Separator />

                {/* Governing Law */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">14. Governing Law</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of the State of
                    California, United States, without regard to its conflict of law provisions. Any disputes
                    shall be resolved in the courts located in San Francisco, California.
                  </p>
                </section>

                <Separator />

                {/* Changes to Terms */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">15. Changes to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these Terms at any time. We will notify users of material
                    changes by posting the new Terms on this page and updating the "Last updated" date. Your
                    continued use of the Service after changes are posted constitutes acceptance of the modified
                    Terms.
                  </p>
                </section>

                <Separator />

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">16. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    If you have any questions about these Terms, please contact us:
                  </p>
                  <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                    <p><strong className="text-foreground">Email:</strong> legal@shophub.com</p>
                    <p><strong className="text-foreground">Phone:</strong> 1-800-SHOPHUB (1-800-746-7482)</p>
                    <p><strong className="text-foreground">Address:</strong> 123 Commerce Street, San Francisco, CA 94105</p>
                    <p><strong className="text-foreground">Business Hours:</strong> Monday-Friday, 9AM-6PM PST</p>
                  </div>
                </section>

                {/* Acknowledgment */}
                <section className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    By using ShopHub, you acknowledge that you have read, understood, and agree to be bound by
                    these Terms of Service. If you do not agree to these Terms, you must discontinue use of our
                    Service immediately.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
