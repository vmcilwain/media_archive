import React from "react";
import { render, screen } from "@testing-library/react";
import Table, { TableColumn } from "../Table";

// Mock data for testing
interface TestData {
  id: number;
  name: string;
  email: string;
  age: number;
}

const mockData: TestData[] = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35 },
];

const basicColumns: TableColumn<TestData>[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "age", header: "Age" },
];

describe("Table Component", () => {
  it("renders table with correct structure", () => {
    render(<Table columns={basicColumns} data={mockData} />);
    
    // Check if table container exists
    expect(screen.getByRole("table")).toBeInTheDocument();
    
    // Check if table has correct CSS classes
    const table = screen.getByRole("table");
    expect(table).toHaveClass("table", "is-fullwidth", "is-striped", "is-hoverable");
  });

  it("renders table headers correctly", () => {
    render(<Table columns={basicColumns} data={mockData} />);
    
    // Check if all headers are rendered
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders table data correctly", () => {
    render(<Table columns={basicColumns} data={mockData} />);
    
    // Check if data is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    expect(screen.getByText("bob@example.com")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
  });

  it("renders correct number of rows", () => {
    render(<Table columns={basicColumns} data={mockData} />);
    
    // Check tbody rows (excluding header row)
    const tbody = screen.getByRole("table").querySelector("tbody");
    const rows = tbody?.querySelectorAll("tr");
    expect(rows).toHaveLength(3);
  });

  it("handles empty data array", () => {
    render(<Table columns={basicColumns} data={[]} />);
    
    // Headers should still be rendered
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    
    // No data rows should be present
    const tbody = screen.getByRole("table").querySelector("tbody");
    const rows = tbody?.querySelectorAll("tr");
    expect(rows).toHaveLength(0);
  });

  it("applies custom className", () => {
    render(<Table columns={basicColumns} data={mockData} className="custom-class" />);
    
    const table = screen.getByRole("table");
    expect(table).toHaveClass("custom-class");
  });

  it("handles custom render functions", () => {
    const columnsWithRender: TableColumn<TestData>[] = [
      { key: "name", header: "Name" },
      { 
        key: "email", 
        header: "Email",
        render: (value) => <a href={`mailto:${value}`}>{value}</a>
      },
      {
        key: "age",
        header: "Age Group",
        render: (value) => value >= 30 ? "Senior" : "Junior"
      }
    ];

    render(<Table columns={columnsWithRender} data={mockData} />);
    
    // Check if custom render functions work
    expect(screen.getAllByText("Senior")).toHaveLength(2); // John (30) and Bob (35)
    expect(screen.getByText("Junior")).toBeInTheDocument(); // Jane (25)
    
    // Check if email links are rendered
    const emailLinks = screen.getAllByRole("link");
    expect(emailLinks).toHaveLength(3);
    expect(emailLinks[0]).toHaveAttribute("href", "mailto:john@example.com");
  });

  it("applies column width and alignment styles", () => {
    const styledColumns: TableColumn<TestData>[] = [
      { key: "id", header: "ID", width: "50px", align: "center" },
      { key: "name", header: "Name", width: "200px", align: "left" },
      { key: "email", header: "Email", align: "right" },
    ];

    render(<Table columns={styledColumns} data={mockData.slice(0, 1)} />);
    
    const headers = screen.getAllByRole("columnheader");
    
    // Check width and alignment styles on headers
    expect(headers[0]).toHaveStyle({ width: "50px", textAlign: "center" });
    expect(headers[1]).toHaveStyle({ width: "200px", textAlign: "left" });
    expect(headers[2]).toHaveStyle({ textAlign: "right" });
    
    // Check alignment on data cells
    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveStyle({ textAlign: "center" });
    expect(cells[1]).toHaveStyle({ textAlign: "left" });
    expect(cells[2]).toHaveStyle({ textAlign: "right" });
  });

  it("handles different data types correctly", () => {
    interface MixedData {
      id: number;
      name: string;
      active: boolean;
      score: number | null;
      tags: string[];
    }

    const mixedData: MixedData[] = [
      { id: 1, name: "Test", active: true, score: 95.5, tags: ["tag1", "tag2"] },
      { id: 2, name: "Test2", active: false, score: null, tags: [] },
    ];

    const mixedColumns: TableColumn<MixedData>[] = [
      { key: "id", header: "ID" },
      { key: "name", header: "Name" },
      { key: "active", header: "Active" },
      { key: "score", header: "Score" },
      { key: "tags", header: "Tags" },
    ];

    render(<Table columns={mixedColumns} data={mixedData} />);
    
    // Check if different data types are converted to strings properly
    expect(screen.getByText("true")).toBeInTheDocument();
    expect(screen.getByText("false")).toBeInTheDocument();
    expect(screen.getByText("95.5")).toBeInTheDocument();
    expect(screen.getByText("null")).toBeInTheDocument();
    expect(screen.getByText("tag1,tag2")).toBeInTheDocument();
  });

  it("passes correct parameters to render function", () => {
    const renderSpy = jest.fn((value, row, index) => `${value}-${row.name}-${index}`);
    
    const columnsWithSpy: TableColumn<TestData>[] = [
      { 
        key: "age", 
        header: "Age",
        render: renderSpy
      },
    ];

    render(<Table columns={columnsWithSpy} data={mockData.slice(0, 2)} />);
    
    // Check if render function was called with correct parameters
    expect(renderSpy).toHaveBeenCalledTimes(2);
    expect(renderSpy).toHaveBeenCalledWith(30, mockData[0], 0);
    expect(renderSpy).toHaveBeenCalledWith(25, mockData[1], 1);
    
    // Check if rendered content appears
    expect(screen.getByText("30-John Doe-0")).toBeInTheDocument();
    expect(screen.getByText("25-Jane Smith-1")).toBeInTheDocument();
  });
});
