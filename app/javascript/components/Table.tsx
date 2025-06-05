import React from "react";

interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
}

const Table = <T extends Record<string, any>>({ 
  columns, 
  data, 
  className 
}: TableProps<T>) => {
  return (
    <div className="table-container">
      <table className={`table is-fullwidth is-striped is-hoverable ${className || ''}`}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={String(column.key)} 
                style={{ 
                  width: column.width,
                  textAlign: column.align || 'left'
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => {
                const value = row[column.key];
                return (
                  <td 
                    key={String(column.key)}
                    style={{ textAlign: column.align || 'left' }}
                  >
                    {column.render 
                      ? column.render(value, row, rowIndex)
                      : String(value)
                    }
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
export type { TableColumn, TableProps };
