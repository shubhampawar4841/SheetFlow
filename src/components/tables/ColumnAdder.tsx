import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';

interface ColumnAdderProps {
  onAddColumn: (column: { name: string; type: 'text' | 'date' }) => Promise<void>;
}

const ColumnAdder = ({ onAddColumn }: ColumnAdderProps) => {
  const [open, setOpen] = useState(false);
  const [columnName, setColumnName] = useState('');
  const [columnType, setColumnType] = useState<'text' | 'date'>('text');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddColumn = async () => {
    if (!columnName.trim()) {
      toast.error('Please enter a column name');
      return;
    }

    setIsAdding(true);
    try {
      await onAddColumn({ name: columnName, type: columnType });
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error adding column:', error);
      // Error is handled by parent component
    } finally {
      setIsAdding(false);
    }
  };

  const resetForm = () => {
    setColumnName('');
    setColumnType('text');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="button-hover">
          <Plus size={16} className="mr-2" />
          Add Column
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] glass-morphism">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Column</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium block">Column Name</label>
            <Input
              placeholder="Enter column name"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              className="input-focus-ring"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Column Type</label>
            <Select
              value={columnType}
              onValueChange={(value) => setColumnType(value as 'text' | 'date')}
            >
              <SelectTrigger className="input-focus-ring">
                <SelectValue placeholder="Select column type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="date">Date</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {columnType === 'date' 
                ? 'Date columns will display a date picker for data entry' 
                : 'Text columns accept any text or numeric input'}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isAdding}>
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          <Button onClick={handleAddColumn} disabled={isAdding || !columnName.trim()}>
            {isAdding ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Adding...
              </div>
            ) : (
              'Add Column'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ColumnAdder;
