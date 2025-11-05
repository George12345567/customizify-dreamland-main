import React, { useState, useEffect } from 'react';
import { Users, Eye, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { gsap } from 'gsap';

interface LiveStatsProps {
  productId?: string;
  type: 'product' | 'customization';
}

const LiveStats: React.FC<LiveStatsProps> = ({ productId, type }) => {
  const [currentViews, setCurrentViews] = useState(0);
  const [totalCustomizations, setTotalCustomizations] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const updateStats = () => {
      if (type === 'product' && productId) {
        // Simulate product views
        setCurrentViews(prev => {
          const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          return Math.max(1, prev + change);
        });
      } else {
        // Simulate customization stats
        setTotalCustomizations(prev => prev + Math.floor(Math.random() * 5));
      }
    };

    const interval = setInterval(updateStats, 3000);
    return () => clearInterval(interval);
  }, [type, productId]);

  // Animate stats on mount
  useEffect(() => {
    if (isVisible) {
      gsap.from('.stat-value', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
      });
    }
  }, [isVisible]);

  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm">
      <div className="space-y-4">
        {type === 'product' ? (
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-roma-purple" />
            <span className="text-sm font-medium">Live Views</span>
            <span className="stat-value text-lg font-bold text-roma-purple">
              {currentViews}
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-roma-purple" />
              <span className="text-sm font-medium">Active Customizers</span>
              <span className="stat-value text-lg font-bold text-roma-purple">
                {currentViews}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-roma-purple" />
              <span className="text-sm font-medium">Customized Today</span>
              <span className="stat-value text-lg font-bold text-roma-purple">
                {totalCustomizations}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LiveStats; 