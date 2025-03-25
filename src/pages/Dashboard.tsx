import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TableCreator from '@/components/tables/TableCreator';
import TableView, { TableData } from '@/components/tables/TableView';
import sheetsService from '@/services/sheetsService';
import authService from '@/services/authService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState<TableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);

  // Check authentication
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  // Setup token expiration check
  useEffect(() => {
    const checkInterval = authService.setupTokenExpirationCheck(() => {
      toast.error('Your session has expired. Please log in again.');
      navigate('/login');
    });
    
    return () => clearInterval(checkInterval);
  }, [navigate]);

  // Load tables
  const fetchTables = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await sheetsService.getTables();
      setTables(data);
      
      // Select the first table by default if one exists and none is selected
      if (data.length > 0 && !selectedTableId) {
        setSelectedTableId(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      toast.error('Failed to load tables');
    } finally {
      setIsLoading(false);
    }
  }, [selectedTableId]);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  // Load selected table data
  useEffect(() => {
    const loadSelectedTable = async () => {
      if (!selectedTableId) {
        setSelectedTable(null);
        return;
      }
      
      try {
        const tableData = await sheetsService.getTableData(selectedTableId);
        setSelectedTable(tableData);
      } catch (error) {
        console.error('Error fetching table data:', error);
        toast.error('Failed to load table data');
        setSelectedTable(null);
      }
    };
    
    loadSelectedTable();
  }, [selectedTableId]);

  const handleCreateTable = async (columns: { name: string; type: 'text' | 'date' }[], spreadsheetUrl: string) => {
    try {
      const newTable = await sheetsService.createTable(columns, spreadsheetUrl);
      setTables((prev) => [...prev, newTable]);
      setSelectedTableId(newTable.id);
      return newTable;
    } catch (error) {
      console.error('Error creating table:', error);
      toast.error('Failed to create table');
      throw error;
    }
  };

  const handleAddColumn = async (tableId: string, column: { name: string; type: 'text' | 'date' }) => {
    try {
      const newColumn = await sheetsService.addColumn(tableId, column);
      
      // Update the tables list and selected table
      fetchTables();
      
      // If this is the currently selected table, update it
      if (selectedTableId === tableId && selectedTable) {
        setSelectedTable({
          ...selectedTable,
          columns: [...selectedTable.columns, newColumn]
        });
      }
      
      return newColumn;
    } catch (error) {
      console.error('Error adding column:', error);
      toast.error('Failed to add column');
      throw error;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <TableCreator onCreateTable={handleCreateTable} />
        </div>
        
        {isLoading ? (
          <div className="py-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-muted-foreground">Loading tables...</p>
          </div>
        ) : tables.length === 0 ? (
          <Card className="glass-morphism fade-in-up">
            <CardContent className="py-16 flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <PlusCircle size={40} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No Tables Yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Create your first table by connecting to Google Sheets and customize it with additional columns.
              </p>
              <TableCreator onCreateTable={handleCreateTable} />
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Table selection sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-morphism rounded-lg p-4 sticky top-24">
                <h3 className="text-lg font-medium mb-4">Your Tables</h3>
                <div className="space-y-2">
                  {tables.map((table) => (
                    <Button
                      key={table.id}
                      variant={selectedTableId === table.id ? "default" : "ghost"}
                      className="w-full justify-start text-left"
                      onClick={() => setSelectedTableId(table.id)}
                    >
                      {table.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Table view */}
            <div className="lg:col-span-4">
              {selectedTable ? (
                <div className="glass-morphism rounded-lg p-6">
                  <TableView 
                    tableData={selectedTable} 
                    onAddColumn={(tableId, column) => handleAddColumn(tableId, column)}
                  />
                </div>
              ) : (
                <div className="glass-morphism rounded-lg p-12 text-center">
                  <p className="text-muted-foreground">Select a table to view or create a new one</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
