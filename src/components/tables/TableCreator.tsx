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
import { Plus, Trash2, X } from 'lucide-react';

interface Column {
  name: string;
  type: 'text' | 'date';
}

interface TableCreatorProps {
  onCreateTable: (columns: Column[], spreadsheetUrl: string) => Promise<void>;
}

const TableCreator = ({ onCreateTable }: TableCreatorProps) => {
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [columnName, setColumnName] = useState('');
  const [columnType, setColumnType] = useState<'text' | 'date'>('text');
  const [spreadsheetUrl, setSpreadsheetUrl] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const addColumn = () => {
    if (!columnName.trim()) {
      toast.error('Please enter a column name');
      return;
    }

    setColumns([...columns, { name: columnName, type: columnType }]);
    setColumnName('');
    setColumnType('text');
  };

  const removeColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleCreateTable = async () => {
    if (columns.length === 0) {
      toast.error('Please add at least one column');
      return;
    }

    if (!spreadsheetUrl) {
      toast.error('Please enter a Google Spreadsheet URL');
      return;
    }

    setIsCreating(true);
    try {
      await onCreateTable(columns, spreadsheetUrl);
      toast.success('Table created successfully');
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error creating table:', error);
      toast.error('Failed to create table. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const resetForm = () => {
    setColumns([]);
    setColumnName('');
    setColumnType('text');
    setSpreadsheetUrl('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="button-hover">
          <Plus size={16} className="mr-2" />
          Create Table
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] glass-morphism">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Table</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium block">Google Spreadsheet URL</label>
            <Input
              placeholder="https://docs.google.com/spreadsheets/d/..."
              value={spreadsheetUrl}
              onChange={(e) => setSpreadsheetUrl(e.target.value)}
              className="input-focus-ring"
            />
            <p className="text-xs text-muted-foreground">
              Enter the URL of the Google Spreadsheet to connect to this table
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Columns</label>
              <p className="text-xs text-muted-foreground">{columns.length} columns added</p>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Column name"
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
                className="input-focus-ring flex-1"
              />
              <Select
                value={columnType}
                onValueChange={(value) => setColumnType(value as 'text' | 'date')}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" onClick={addColumn} className="button-hover">
                <Plus size={16} />
              </Button>
            </div>

            {columns.length > 0 && (
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                {columns.map((column, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-secondary/30 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{column.name}</span>
                      <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                        {column.type}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeColumn(index)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isCreating}>
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          <Button onClick={handleCreateTable} disabled={isCreating || columns.length === 0}>
            {isCreating ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Creating...
              </div>
            ) : (
              'Create Table'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TableCreator;