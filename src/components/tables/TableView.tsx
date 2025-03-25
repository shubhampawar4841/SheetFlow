import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Calendar } from 'lucide-react';
import ColumnAdder from './ColumnAdder';
import { format } from 'date-fns';

export interface Column {
  id: string;
  name: string;
  type: 'text' | 'date';
  isFromSheet: boolean;
}

export interface TableData {
  id: string;
  columns: Column[];
  rows: Record<string, string>[];
  spreadsheetUrl: string;
  name: string;
}

interface TableViewProps {
  tableData: TableData;
  onAddColumn: (tableId: string, column: { name: string; type: 'text' | 'date' }) => Promise<void>;
}

const TableView = ({ tableData, onAddColumn }: TableViewProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<Record<string, string>[]>(tableData.rows || []);
  const [columns, setColumns] = useState<Column[]>(tableData.columns || []);

  useEffect(() => {
    // Simulating real-time data fetching
    const fetchInterval = setInterval(() => {
      fetchTableData();
    }, 5000); // Check for updates every 5 seconds

    fetchTableData(); // Initial fetch

    return () => clearInterval(fetchInterval);
  }, [tableData.id]);

  // In a real app, this would connect to your backend
  const fetchTableData = async () => {
    setIsLoading(true);
    try {
      // For demo, we'll just use the current data and occasionally add a simulated new row
      // In a real app, this would be an API call to the backend
      
      // Simulate occasional new data (1 in 3 chance)
      if (Math.random() > 0.7) {
        const newRow = generateMockRow(tableData.columns);
        setRows((prevRows) => [...prevRows, newRow]);
      }
      
      // Update columns from props in case they've changed
      setColumns(tableData.columns);
      
    } catch (error) {
      console.error('Error fetching table data:', error);
      toast.error('Failed to refresh table data');
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockRow = (columns: Column[]) => {
    const row: Record<string, string> = {};
    
    columns.forEach((column) => {
      if (column.isFromSheet) {
        if (column.type === 'date') {
          // Generate a random date within last year
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 365));
          row[column.id] = format(date, 'yyyy-MM-dd');
        } else {
          // Generate some sample text data
          const sampleTexts = ['Sample data', 'Test value', 'Example', 'New entry', 'Content'];
          row[column.id] = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        }
      } else {
        row[column.id] = ''; // Custom columns start empty
      }
    });
    
    return row;
  };

  const handleAddColumn = async (newColumn: { name: string; type: 'text' | 'date' }) => {
    try {
      await onAddColumn(tableData.id, newColumn);
      toast.success(`Added ${newColumn.name} column`);
    } catch (error) {
      console.error('Error adding column:', error);
      toast.error('Failed to add column');
    }
  };

  // Helper function to format cell display based on column type
  const formatCellContent = (value: string, columnType: string) => {
    if (!value) return '';
    
    if (columnType === 'date') {
      try {
        return format(new Date(value), 'MMM d, yyyy');
      } catch (e) {
        return value;
      }
    }
    
    return value;
  };

  return (
    <div className="space-y-4 fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold">{tableData.name || 'Table View'}</h3>
          <p className="text-sm text-muted-foreground">Linked to Google Sheets</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTableData}
            disabled={isLoading}
            className="button-hover"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Syncing...
              </div>
            ) : (
              'Refresh Data'
            )}
          </Button>
          <ColumnAdder onAddColumn={handleAddColumn} />
        </div>
      </div>

      <div className="table-container">
        {columns.length === 0 ? (
          <div className="text-center py-12 bg-secondary/20 rounded-lg">
            <p className="text-muted-foreground">No columns defined for this table yet</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.id} className="whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>{column.name}</span>
                      {column.type === 'date' && <Calendar size={14} />}
                      {!column.isFromSheet && (
                        <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-full">
                          Custom
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-12">
                    <p className="text-muted-foreground">No data available</p>
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr key={index} className="table-row-hover">
                    {columns.map((column) => (
                      <td key={`${index}-${column.id}`}>
                        {formatCellContent(row[column.id] || '', column.type)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TableView;