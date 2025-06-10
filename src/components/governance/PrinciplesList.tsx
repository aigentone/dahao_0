import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GovernancePrinciple, GovernanceDiscussion } from '@/types/governance';

interface PrinciplesListProps {
  principles: GovernancePrinciple[];
  discussionsByPrinciple: Record<string, GovernanceDiscussion[]>;
  selectedPrinciple: string | null;
  onSelectPrinciple: (principleId: string) => void;
  organizationName: string;
}

export function PrinciplesList({ 
  principles, 
  discussionsByPrinciple,
  selectedPrinciple, 
  onSelectPrinciple,
  organizationName 
}: PrinciplesListProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core': return '📋';
      case 'domain_core': return '🎯';
      case 'domain_specific': return '🔧';
      case 'domain_enhanced': return '⚡';
      default: return '📄';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'bg-blue-100 text-blue-800';
      case 'domain_core': return 'bg-green-100 text-green-800';
      case 'domain_specific': return 'bg-purple-100 text-purple-800';
      case 'domain_enhanced': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-1/3 pr-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            {organizationName} Principles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {principles.map((principle) => {
            const discussions = discussionsByPrinciple[principle.principle_id] || [];
            const isSelected = selectedPrinciple === principle.principle_id;
            
            return (
              <Button
                key={principle.principle_id}
                variant="ghost"
                onClick={() => onSelectPrinciple(principle.principle_id)}
                className={`w-full justify-start h-auto p-4 transition-all duration-200 ${
                  isSelected 
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 shadow-md" 
                    : "hover:bg-gray-50 hover:shadow-sm border-l-4 border-transparent"
                }`}
              >
                <div className="flex items-start gap-3 w-full">
                  <span className="text-xl">{getCategoryIcon(principle.category)}</span>
                  <div className="flex-1 text-left">
                    <div className={`font-semibold ${isSelected ? "text-blue-900" : "text-gray-900"}`}>
                      {principle.name}
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge 
                        variant="outline" 
                        className={`text-xs font-medium ${getCategoryColor(principle.category)}`}
                      >
                        {principle.category.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700">
                        v{principle.version}
                      </Badge>
                      {discussions.length > 0 && (
                        <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
                          💬 {discussions.length}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
          
          {principles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <p>No principles found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}