import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Transform Your
            <span className="text-primary block mt-2">Spreadsheet Experience</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create dynamic, real-time tables connected to Google Sheets. Add custom columns, 
            visualize your data, and collaborate effortlessly.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button 
              size="lg"
              className="button-hover px-8 py-6 text-lg"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="button-hover px-8 py-6 text-lg"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 fade-in-up">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Google Sheets Integration</h3>
              <p className="text-muted-foreground">
                Connect your Google Sheets seamlessly and see changes in real-time without manual updates.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Columns</h3>
              <p className="text-muted-foreground">
                Add additional columns with different data types that only exist in your dashboard view.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Authentication</h3>
              <p className="text-muted-foreground">
                JWT-based authentication keeps your data secure and ensures only authorized access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3 fade-in-up">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mx-auto">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium">Create Account</h3>
              <p className="text-sm text-muted-foreground">
                Sign up and get access to all features
              </p>
            </div>
            
            <div className="space-y-3 fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mx-auto">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium">Connect Spreadsheet</h3>
              <p className="text-sm text-muted-foreground">
                Link your Google Sheet to the dashboard
              </p>
            </div>
            
            <div className="space-y-3 fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mx-auto">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium">Configure Table</h3>
              <p className="text-sm text-muted-foreground">
                Choose columns and data types
              </p>
            </div>
            
            <div className="space-y-3 fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mx-auto">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-medium">Enjoy Real-time Updates</h3>
              <p className="text-sm text-muted-foreground">
                See changes instantly as they happen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create your account today and start building dynamic dashboards connected to your Google Sheets.
          </p>
          <Button 
            size="lg"
            className="button-hover px-8 py-6 text-lg mt-4"
            onClick={() => navigate('/signup')}
          >
            Create Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SheetFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
