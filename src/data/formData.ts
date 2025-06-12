
export const requestOptions = [
  { value: 'internal', label: 'Internal' },
  { value: 'external', label: 'External' }
];

export const formDataMapping = {
  internal: {
    mailers: ['Certificates'],
    'mass-communication': ['Mail', 'WhatsApp etc.'],
    'website-update': ['Blogs', 'Pop-up'],
    printing: ['Certificate', 'Signage', 'Posters', 'Birthday card', 'Business Card', 'ID Card', 'Calendar', 'Diary/Notebooks'],
    products: ['Awards', 'Memento', 'Clothing', 'Hampers', 'Stationery']
  },
  external: {
    printing: ['Signage', 'Menu', 'Flyer', 'Poster', 'Standees', 'Tent Card'],
    'social-media-post': ['Threads', 'Tweet', 'Static (Post)', 'Reel', 'Story', 'Community Channel'],
    'mass-communication': ['Mail', 'WhatsApp etc.'],
    press: ['Print', 'Online (Text/Video) : Press Note/ Interview', 'TV'],
    'website-update': ['Blogs']
  }
};

export const mediumOptions = {
  internal: [
    { value: 'mailers', label: 'Mailers' },
    { value: 'mass-communication', label: 'Mass Communication' },
    { value: 'website-update', label: 'Website update' },
    { value: 'printing', label: 'Printing' },
    { value: 'products', label: 'Products' }
  ],
  external: [
    { value: 'printing', label: 'Printing' },
    { value: 'social-media-post', label: 'Social Media post' },
    { value: 'mass-communication', label: 'Mass Communication' },
    { value: 'press', label: 'Press' },
    { value: 'website-update', label: 'Website Update' }
  ]
};

export const users = [
  { value: 'john-doe', label: 'John Doe' },
  { value: 'jane-smith', label: 'Jane Smith' },
  { value: 'mike-johnson', label: 'Mike Johnson' },
  { value: 'sarah-wilson', label: 'Sarah Wilson' }
];

export const vendors = [
  { value: 'vendor-1', label: 'Creative Solutions Ltd' },
  { value: 'vendor-2', label: 'Design Hub Co' },
  { value: 'vendor-3', label: 'Print Masters Inc' },
  { value: 'vendor-4', label: 'Digital Agency Pro' }
];

export const companies = [
  { value: 'company-1', label: 'ABC Corporation' },
  { value: 'company-2', label: 'XYZ Industries' },
  { value: 'company-3', label: 'Global Tech Solutions' }
];

export const locations = [
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'chennai', label: 'Chennai' }
];

export const branches = [
  { value: 'branch-1', label: 'Main Branch' },
  { value: 'branch-2', label: 'North Branch' },
  { value: 'branch-3', label: 'South Branch' }
];

export const brands = [
  { value: 'brand-1', label: 'Brand Alpha' },
  { value: 'brand-2', label: 'Brand Beta' },
  { value: 'brand-3', label: 'Brand Gamma' }
];

export const divisions = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'operations', label: 'Operations' },
  { value: 'hr', label: 'Human Resources' }
];

export const departments = [
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'content-creation', label: 'Content Creation' },
  { value: 'brand-management', label: 'Brand Management' },
  { value: 'public-relations', label: 'Public Relations' }
];

export const approvers = [
  { value: 'approver-1', label: 'Rajesh Kumar (Manager)' },
  { value: 'approver-2', label: 'Priya Sharma (Senior Manager)' },
  { value: 'approver-3', label: 'Amit Singh (Director)' },
  { value: 'approver-4', label: 'Sunita Patel (VP)' },
  { value: 'marketing-head', label: 'Vikram Gupta (Marketing Head)' }
];
