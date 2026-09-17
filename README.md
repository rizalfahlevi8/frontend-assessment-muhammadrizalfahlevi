# Frontend Assessment - Product Dashboard

This repository contains the solution for the Junior Frontend Developer Technical Assessment. It includes a vanilla JavaScript logic exercise and a React-based e-commerce product dashboard.

## 1. Setup Instructions and Environment Variables

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Running the Application
1. Clone the repository and navigate into it:
   ```bash
   cd frontend-assessment-muhammadrizalfahlevi
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

### Environment Variables
The API Base URL configuration can be set via Vite environment variables. An environment template is provided in the `.env.example` file.

1. Create / copy the `.env` file from the template:
   ```bash
   cp .env.example .env
   ```
2. Fill in the `VITE_API_BASE_URL` variable in the `.env` file:
   ```env
   VITE_API_BASE_URL=https://my-json-server.typicode.com/rizalfahlevi8/frontend-assessment-muhammadrizalfahlevi
   ```



## 2. Live my-json-server Endpoint URL

The mock REST API backend is available at:
https://my-json-server.typicode.com/rizalfahlevi8/frontend-assessment-muhammadrizalfahlevi/products

Supported endpoints:
- GET /products : Fetch all products
- GET /products/:id : Fetch a single product
- POST /products : Create a product
- PATCH /products/:id : Update a product
- DELETE /products/:id : Delete a product

## 3. Short Architecture Overview

The application is built using React, Vite, Tailwind CSS, and Redux Toolkit. It follows a clean architecture separating the UI components, state management store, business logic hooks, and API services.

### Folder Structure
- `src/components`: Contains all UI components, separated into `common` (reusable elements like buttons, inputs, custom dropdown selects, modals, toast) and `product` (domain-specific elements like forms, cards, filters, and tables).
- `src/store`: Houses Redux Toolkit store slices (`productsSlice` for CRUD & optimistic updates and `toastSlice` for global toast notifications).
- `src/hooks`: Custom React hooks (e.g., `useDebounce`, `usePagination`, `useProductFilters`, `useProducts`, `useProductStats`, `useProductModals`) to abstract complex logic out of the UI components.
- `src/services`: The API layer containing `productService.js` to handle all HTTP requests using Axios.
- `src/utils`: Pure utility functions for formatting currency, formatting dates, and validating form inputs.
- `src/constants`: Application-wide constants including API base URL, pagination settings, and seeded categories & statuses.

### Key Components
- `ProductTable`: A responsive data table that displays the list of products and handles row-level actions (view, edit, delete).
- `ProductFilters`: Search input with dynamic filtering, custom interactive dropdowns for category & status, and reset capabilities.
- `ProductFormModal`: A reusable, controlled form component used for both creating and editing products. It handles real-time validation and submission.
- `ProductDetailModal`: Modal displaying complete product specifications without redundant technical data.
- `Redux Store (productsSlice)`: The central single source of truth for products data, managing async network requests and coordinating optimistic UI updates.

## 4. Notes on Decisions and Trade-offs

### Optimistic UI Update Strategy
Because `my-json-server` persists changes only in-memory and can reset, I implemented an optimistic UI strategy to ensure a snappy, zero-latency user experience:
1. **Immediate Local Mutation**: When a user creates, edits, or deletes a product, the Redux store updates the local state immediately without waiting for the server response.
2. **Server Reconciliation**: Once the server responds successfully, the local optimistic item is reconciled with the canonical server data (e.g., matching the assigned ID).
3. **Automatic Rollback on Failure**: If the network request fails, the store automatically rolls back the local state to its exact previous snapshot and displays a non-blocking error notification.

### State Management: Redux Toolkit
I chose **Redux Toolkit (`@reduxjs/toolkit` and `react-redux`)** for global state management:
- **Predictable & Scalable**: Centralizes data flow into immutable slices with structured actions and reducers.
- **Granular Optimistic Handling**: Provides dedicated action reducers (`optimisticAdd`, `reconcileAdd`, `rollbackAdd`, etc.) that make optimistic updates deterministic and easy to audit.
- **Zero Prop Drilling**: Combined with custom consumer hooks (`useProducts`, `useToast`), components retain a clean and modular API while accessing the central Redux store.

### Reusable Form Validation
A single reusable form component (`ProductFormModal`) is used for both creating and editing products to prevent code duplication. Validation logic is extracted into a pure utility (`utils/validation.js`). The form provides inline, field-level error messages dynamically as the user types or blurs the input, and disables the submit button while the form is invalid or a submission is in flight.

## 5. What I would improve with more time

- **Authentication & Role-Based Access**: Implement secure user login and authorization logic to protect the dashboard, ensuring that only authenticated administrators can perform CRUD operations on the product catalog.

- **Internationalization (i18n)**: Integrate multi-language support using libraries like react-i18next to dynamically switch the application interface and product details between English, Indonesian, and other target languages.

- **Accessibility (a11y) Enhancements**: Improve the user interface for people with disabilities by strictly adhering to WCAG standards. This includes adding comprehensive ARIA attributes, ensuring full keyboard navigability across the data table and modals, and optimizing the app for screen readers.
