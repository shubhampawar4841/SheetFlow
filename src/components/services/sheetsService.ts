// This is a mock implementation for demo purposes
// In a real app, this would communicate with your backend API which integrates with Google Sheets API

import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Column, TableData } from '@/components/tables/TableView';

// Simulated data storage (would be on the backend in a real app)
let mockTables: TableData[] = [];

class SheetsService {
  async createTable(columns: { name: string; type: 'text' | 'date' }[], spreadsheetUrl: string): Promise<TableData> {
    // In a real app, this would validate the spreadsheet URL and set up the connection
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const tableId = uuidv4();
        
        // Convert columns to the format with IDs and isFromSheet flag
        const formattedColumns: Column[] = columns.map(col => ({
          id: uuidv4(),
          name: col.name,
          type: col.type,
          isFromSheet: true // These columns are from the original sheet
        }));
        
        // Create table with empty rows initially
        const newTable: TableData = {
          id: tableId,
          name: `Table ${mockTables.length + 1}`,
          columns: formattedColumns,
          rows: [],
          spreadsheetUrl
        };
        
        // Add some initial mock data
        const mockRows = this.generateMockRows(formattedColumns, 5);
        newTable.rows = mockRows;
        
        mockTables.push(newTable);
        resolve(newTable);
      }, 1500);
    });
  }

  async getTables(): Promise<TableData[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockTables]);
      }, 800);
    });
  }

  async getTableData(tableId: string): Promise<TableData> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const table = mockTables.find(t => t.id === tableId);
        if (table) {
          resolve({...table});
        } else {
          reject(new Error('Table not found'));
        }
      }, 800);
    });
  }

  async addColumn(tableId: string, column: { name: string; type: 'text' | 'date' }): Promise<Column> {
    // Simulate API call to add a custom column
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tableIndex = mockTables.findIndex(t => t.id === tableId);
        if (tableIndex === -1) {
          reject(new Error('Table not found'));
          return;
        }
        
        // Create new column
        const newColumn: Column = {
          id: uuidv4(),
          name: column.name,
          type: column.type,
          isFromSheet: false // This is a custom column, not from the sheet
        };
        
        // Add column to table
        mockTables[tableIndex].columns.push(newColumn);
        
        // Update each row with an empty value for the new column
        mockTables[tableIndex].rows.forEach(row => {
          row[newColumn.id] = '';
        });
        
        resolve(newColumn);
      }, 1000);
    });
  }

  // Helper method to generate mock data for demo
  private generateMockRows(columns: Column[], count: number): Record<string, string>[] {
    const rows: Record<string, string>[] = [];
    
    for (let i = 0; i < count; i++) {
      const row: Record<string, string> = {};
      
      columns.forEach(column => {
        if (column.type === 'date') {
          // Generate a random date within last year
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 365));
          row[column.id] = date.toISOString().split('T')[0];
        } else {
          // Generate random text data
          const sampleTexts = [
            'Sample data', 
            'Test content', 
            'Example value', 
            'Demo text',
            'Information'
          ];
          row[column.id] = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        }
      });
      
      rows.push(row);
    }
    
    return rows;
  }
}

export default new SheetsService();