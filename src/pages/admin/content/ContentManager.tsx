import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ContentManager() {
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      // In a real implementation this hooks to your React Query/API service
      // We will mock this to demonstrate functionality, since standard fetch might need JWT token logic here
      const token = localStorage.getItem('token');
      
      const res = await fetch('http://localhost:4000/api/content/hero_content', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const value = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
        setHeroTitle(value?.title || '');
        setHeroSubtitle(value?.subtitle || '');
      }
    } catch (error) {
      console.error('Failed to fetch hero content', error);
    }
  };

  const saveHeroContent = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          key: 'hero_content',
          type: 'json',
          description: 'Homepage Hero texts',
          value: { title: heroTitle, subtitle: heroSubtitle }
        })
      });

      if (res.ok) {
        toast.success('Hero content updated successfully');
      } else {
        toast.error('Failed to update hero content');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Content Manager</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Homepage Hero Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input 
                id="heroTitle" 
                value={heroTitle} 
                onChange={(e) => setHeroTitle(e.target.value)} 
                placeholder="e.g. Innovate Everything" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
              <Textarea 
                id="heroSubtitle" 
                value={heroSubtitle} 
                onChange={(e) => setHeroSubtitle(e.target.value)} 
                placeholder="e.g. We build the future"
              />
            </div>
            <Button onClick={saveHeroContent} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
