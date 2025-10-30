import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';
import { Shield, Lock, Eye, Database, UserCheck, Globe } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: October 29, 2025</p>
        </div>

        <Card>
          <CardContent className="p-8">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    At ShopHub, we take your privacy seriously. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you visit our website or use our services.
                    Please read this policy carefully to understand our practices regarding your personal data.
                  </p>
                </section>

                <Separator />

                {/* Information We Collect */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Information We Collect</h2>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 mt-6">Personal Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Name, email address, and phone number</li>
                    <li>Shipping and billing addresses</li>
                    <li>Payment information (processed securely through our payment processor)</li>
                    <li>Account credentials (username and encrypted password)</li>
                    <li>Order history and purchase preferences</li>
                    <li>Communication preferences and marketing opt-ins</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-3 mt-6">Automatically Collected Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    When you visit our website, we automatically collect:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Pages viewed and time spent on pages</li>
                    <li>Referring website and search terms</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                <Separator />

                {/* How We Use Your Information */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <UserCheck className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">How We Use Your Information</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We use the information we collect for the following purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about your orders and account</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Improve our website and services</li>
                    <li>Detect and prevent fraud or security incidents</li>
                    <li>Comply with legal obligations</li>
                    <li>Analyze usage patterns and optimize user experience</li>
                  </ul>
                </section>

                <Separator />

                {/* Information Sharing */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Information Sharing and Disclosure</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We do not sell your personal information. We may share your information with:
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-2 mt-4">Service Providers</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Third-party vendors who perform services on our behalf, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Payment processing (Stripe, PayPal)</li>
                    <li>Shipping and delivery services</li>
                    <li>Email service providers</li>
                    <li>Analytics and advertising platforms</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2 mt-4">Legal Requirements</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    We may disclose your information if required by law or in response to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Legal processes (subpoenas, court orders)</li>
                    <li>Government requests</li>
                    <li>Protection of our rights and safety</li>
                    <li>Investigation of fraud or security issues</li>
                  </ul>
                </section>

                <Separator />

                {/* Data Security */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Data Security</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We implement industry-standard security measures to protect your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>SSL/TLS encryption for all data transmissions</li>
                    <li>Secure socket layer technology for payment processing</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Access controls and authentication requirements</li>
                    <li>Encrypted storage of sensitive information</li>
                    <li>Employee training on data protection practices</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    However, no method of transmission over the Internet is 100% secure. While we strive to
                    protect your data, we cannot guarantee absolute security.
                  </p>
                </section>

                <Separator />

                {/* Cookies */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Cookies and Tracking Technologies</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We use cookies and similar technologies to enhance your experience:
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-2 mt-4">Types of Cookies We Use:</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong className="text-foreground">Essential Cookies:</strong> Required for website functionality</li>
                    <li><strong className="text-foreground">Performance Cookies:</strong> Help us understand how visitors use our site</li>
                    <li><strong className="text-foreground">Functional Cookies:</strong> Remember your preferences (e.g., theme, language)</li>
                    <li><strong className="text-foreground">Marketing Cookies:</strong> Deliver relevant advertisements (with consent)</li>
                  </ul>
                  
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    You can control cookies through your browser settings. Note that disabling cookies may limit
                    your ability to use certain features of our website.
                  </p>
                </section>

                <Separator />

                {/* Your Rights */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong className="text-foreground">Access:</strong> Request a copy of the personal data we hold about you</li>
                    <li><strong className="text-foreground">Correction:</strong> Request corrections to inaccurate or incomplete data</li>
                    <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong className="text-foreground">Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                    <li><strong className="text-foreground">Portability:</strong> Request your data in a portable format</li>
                    <li><strong className="text-foreground">Objection:</strong> Object to processing of your data for certain purposes</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    To exercise these rights, please contact us at privacy@shophub.com or through your account
                    settings. We will respond to your request within 30 days.
                  </p>
                </section>

                <Separator />

                {/* Children's Privacy */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our Service is not intended for children under 18 years of age. We do not knowingly collect
                    personal information from children. If you are a parent or guardian and believe your child
                    has provided us with personal information, please contact us immediately, and we will delete
                    such information.
                  </p>
                </section>

                <Separator />

                {/* International Users */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your information may be transferred to and maintained on servers located outside your country.
                    By using our Service, you consent to the transfer of your information to the United States
                    and other countries where we operate. We ensure appropriate safeguards are in place for such
                    transfers in compliance with applicable data protection laws.
                  </p>
                </section>

                <Separator />

                {/* Data Retention */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your personal information for as long as necessary to fulfill the purposes outlined
                    in this Privacy Policy, unless a longer retention period is required by law. After you request
                    account deletion, we will delete or anonymize your data within 90 days, except for information
                    we must retain for legal or regulatory purposes.
                  </p>
                </section>

                <Separator />

                {/* Changes to Policy */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of material changes
                    by posting the new policy on this page and updating the "Last updated" date. We encourage you
                    to review this policy periodically. Your continued use of the Service after changes are posted
                    constitutes acceptance of the updated policy.
                  </p>
                </section>

                <Separator />

                {/* Contact */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    If you have questions or concerns about this Privacy Policy or our data practices, please
                    contact us:
                  </p>
                  <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                    <p><strong className="text-foreground">Privacy Team:</strong> privacy@shophub.com</p>
                    <p><strong className="text-foreground">Phone:</strong> 1-800-746-7482</p>
                    <p><strong className="text-foreground">Mail:</strong> ShopHub Privacy Officer<br />
                    123 Commerce Street, San Francisco, CA 94105</p>
                  </div>
                </section>

                {/* GDPR/CCPA Notice */}
                <section className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-semibold mb-3">Additional Rights for EU and California Residents</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If you are a resident of the European Union or California, you have additional rights under
                    GDPR and CCPA respectively. For more information about these rights, please contact our
                    privacy team at privacy@shophub.com.
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
