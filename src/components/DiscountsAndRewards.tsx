import React, { useState } from 'react';
import { Gift, Tag, Truck, Star, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { gsap } from 'gsap';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'shipping' | 'exclusive';
  value: string;
}

interface DiscountsAndRewardsProps {
  points: number;
  onRedeem: (reward: Reward) => void;
}

const DiscountsAndRewards: React.FC<DiscountsAndRewardsProps> = ({
  points,
  onRedeem
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const rewards: Reward[] = [
    {
      id: '1',
      title: '10% Off Next Purchase',
      description: 'Get 10% off your next order',
      pointsCost: 100,
      type: 'discount',
      value: 'SAVE10'
    },
    {
      id: '2',
      title: 'Free Shipping',
      description: 'Free shipping on your next order',
      pointsCost: 50,
      type: 'shipping',
      value: 'FREESHIP'
    },
    {
      id: '3',
      title: 'Exclusive Design Access',
      description: 'Early access to new designs',
      pointsCost: 200,
      type: 'exclusive',
      value: 'EXCLUSIVE'
    }
  ];

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const handleRedeem = (reward: Reward) => {
    if (points < reward.pointsCost) {
      toast.error('Not enough points');
      return;
    }
    onRedeem(reward);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <Gift className="h-5 w-5 text-roma-purple mr-2" />
          Available Rewards
        </h2>
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">{points} points</span>
        </div>
      </div>

      <div className="grid gap-4">
        {rewards.map(reward => (
          <Card key={reward.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium flex items-center">
                  {reward.type === 'discount' && <Tag className="h-4 w-4 text-roma-purple mr-2" />}
                  {reward.type === 'shipping' && <Truck className="h-4 w-4 text-roma-purple mr-2" />}
                  {reward.type === 'exclusive' && <Star className="h-4 w-4 text-roma-purple mr-2" />}
                  {reward.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{reward.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{reward.pointsCost} points</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRedeem(reward)}
                  disabled={points < reward.pointsCost}
                >
                  Redeem
                </Button>
              </div>
            </div>

            {reward.type === 'discount' && (
              <div className="mt-3 flex items-center space-x-2">
                <code className="px-2 py-1 bg-gray-100 rounded text-sm">
                  {reward.value}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyCode(reward.value)}
                >
                  {copiedCode === reward.value ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DiscountsAndRewards; 