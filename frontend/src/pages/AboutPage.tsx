import { Card, CardContent } from '../components/ui/card';
import { Package, Users, Target, Award, Heart, Zap } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Package className="h-20 w-20 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6">About ShopHub</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your trusted destination for quality products, exceptional service, and an
            unparalleled shopping experience since 2020.
          </p>
        </div>

        {/* Our Story */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                ShopHub was founded in 2020 with a simple mission: to make online shopping easier,
                more enjoyable, and more accessible for everyone. What started as a small team of
                passionate entrepreneurs has grown into a thriving e-commerce platform serving
                thousands of customers worldwide.
              </p>
              <p>
                We believe that shopping online should be more than just a transaction—it should be
                an experience. That's why we've carefully curated a diverse selection of products,
                from cutting-edge electronics to stylish fashion, home essentials to outdoor gear.
                Every item in our catalog is chosen with care to ensure it meets our high standards
                of quality and value.
              </p>
              <p>
                Our commitment goes beyond just selling products. We're building a community of
                satisfied customers who trust us to deliver exceptional service, competitive prices,
                and a seamless shopping experience from start to finish.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Customer First</h3>
                </div>
                <p className="text-muted-foreground">
                  Your satisfaction is our top priority. We go above and beyond to ensure every
                  customer has an amazing experience with us.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Quality</h3>
                </div>
                <p className="text-muted-foreground">
                  We never compromise on quality. Every product is carefully vetted to meet our
                  high standards before it reaches you.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Innovation</h3>
                </div>
                <p className="text-muted-foreground">
                  We continuously improve our platform with the latest technology to make shopping
                  faster, easier, and more enjoyable.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Transparency</h3>
                </div>
                <p className="text-muted-foreground">
                  Honest pricing, clear policies, and open communication. We believe in building
                  trust through transparency.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Community</h3>
                </div>
                <p className="text-muted-foreground">
                  We're more than a store—we're a community. Join thousands of happy customers who
                  shop with confidence.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Reliability</h3>
                </div>
                <p className="text-muted-foreground">
                  On-time delivery, secure transactions, and dependable service. Count on us to
                  deliver every time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <Card className="mb-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center mb-8">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">4.8/5</div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6">Why Choose ShopHub?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">🚚 Fast & Free Shipping</h3>
                <p className="text-muted-foreground">
                  Free standard shipping on orders over $100. Express and next-day delivery options
                  available for when you need it fast.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">🔒 Secure Shopping</h3>
                <p className="text-muted-foreground">
                  Your data is protected with industry-leading encryption. Shop with confidence
                  knowing your information is safe.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">↩️ Easy Returns</h3>
                <p className="text-muted-foreground">
                  Not satisfied? No problem. Hassle-free 30-day returns with prepaid shipping labels
                  and full refunds.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">💬 24/7 Support</h3>
                <p className="text-muted-foreground">
                  Our friendly support team is always here to help. Reach us via email, phone, or
                  live chat anytime.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">💰 Best Price Guarantee</h3>
                <p className="text-muted-foreground">
                  Find it cheaper elsewhere? We'll match the price plus give you an extra 10% off
                  within 7 days of purchase.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">⭐ Quality Assured</h3>
                <p className="text-muted-foreground">
                  Every product is inspected and comes with a satisfaction guarantee. Your trust is
                  our most valuable asset.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the ShopHub Family</h2>
            <p className="text-lg mb-6 opacity-90">
              Experience the difference of shopping with a company that truly cares about you.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/products"
                className="px-8 py-3 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors"
              >
                Start Shopping
              </a>
              <a
                href="/contact"
                className="px-8 py-3 bg-primary-foreground/10 backdrop-blur rounded-lg font-semibold hover:bg-primary-foreground/20 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
