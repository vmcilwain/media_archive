import React from 'react';
import Table, { TableColumn } from '../components/Table';
import Link from '../components/Link';

interface ExampleData {
  id: number;
  title: string;
  artist: string;
  kind: string;
  created_at: string;
  row_options?: any
}

const MediaListPage: React.FC = () => {
  // Example data
  const sampleData: ExampleData[] = [
    { id: 1, title: 'J52 Girls', artist: "The B52's", kind: "CD", created_at: '2024-01-15' },
    { id: 2, title: 'Baby', artist: 'Lil Baby', kind: "Tape", created_at: '2024-02-20' },
    { id: 3, title: 'Bad Company', artist: 'Bad Company', kind: "Record", created_at: '2024-03-10' }
  ];

  // Handle edit action
  const handleEdit = (id: number) => {
    console.log('Edit media with ID:', id);
    // TODO: Implement edit functionality
    alert(`Edit media with ID: ${id}`);
  };

  // Handle delete action
  const handleDelete = (id: number) => {
    console.log('Delete media with ID:', id);
    // TODO: Implement delete functionality
    if (confirm('Are you sure you want to delete this media item?')) {
      alert(`Delete media with ID: ${id}`);
    }
  };

  // Column configuration with custom render functions
  const columns: TableColumn<ExampleData>[] = [
    {
      key: 'title',
      header: 'TItle',
      // width: '80px',
      // align: 'center'
    },
    {
      key: 'artist',
      header: 'Artists',
      render: (value) => <strong>{value}</strong>
    },
    {
      key: 'kind',
      header: 'Kind',
      render: (value) => <span className="tag is-info">{value}</span>
    },
    {
      key: 'created_at',
      header: 'Created Date',
      render: (value) => new Date(value).toLocaleDateString(),
      align: 'center'
    },
    {
      key: 'row_options',
      align: 'center',
      header: 'Options',
      render: (value, row) => (
        <div className="buttons is-centered">
          <button 
            className="button is-small is-primary"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </button>
          <button 
            className="button is-small is-danger"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="container">
      <section className="section">
        <div className="container">
          <h1 className="title is-1">Media Archive</h1>
          <h2 className="subtitle is-3">Your list of media!</h2>
          <Table columns={columns} data={sampleData} />
        </div>
      </section>
    </div>
  );
};

export default MediaListPage;
