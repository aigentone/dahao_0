import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GovernanceOrganization } from '@/types/governance';

interface OrganizationSelectorProps {
  organizations: GovernanceOrganization[];
  selectedOrg: string | null;
  onSelectOrg: (orgId: string) => void;
}

export function OrganizationSelector({ 
  organizations, 
  selectedOrg, 
  onSelectOrg 
}: OrganizationSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Organization</h2>
      <div className="flex gap-4 flex-wrap">
        {organizations.map((org) => (
          <Button
            key={org.id}
            variant={selectedOrg === org.id ? "default" : "outline"}
            onClick={() => onSelectOrg(org.id)}
            className={`flex items-center gap-3 h-auto py-4 px-6 transition-all duration-200 ${
              selectedOrg === org.id 
                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg scale-105" 
                : "hover:shadow-md hover:border-blue-300 hover:scale-102"
            }`}
          >
            <span className="text-2xl">{org.emoji}</span>
            <div className="text-left">
              <div className="font-semibold text-base">{org.name}</div>
              <Badge 
                variant={selectedOrg === org.id ? "secondary" : "outline"} 
                className={`mt-1 text-xs ${
                  selectedOrg === org.id ? "bg-blue-100 text-blue-800" : ""
                }`}
              >
                v{org.version}
              </Badge>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}