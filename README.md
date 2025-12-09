# Real-time Dashboard

## Project Overview

This is a real-time dashboard application built with Next.js, React, and Tailwind CSS. It displays live metrics, real-time charts, notifications, and a virtualized data table, simulating a dynamic data environment.

## Features

- **Live Metrics:** Displays key performance indicators such as active users, CPU usage, memory usage, and requests per minute with real-time updates and trend indicators.
- **Real-Time Chart:** Visualizes system performance (CPU, Memory, Network) over time with options to switch between line and area charts.
- **Notifications Panel:** Shows a stream of live notifications (info, success, warning, error) with options to clear individual notifications or all of them.
- **Timer Control:** A versatile timer supporting both stopwatch and countdown modes.
- **Virtualized Data Table:** Displays a real-time stream of data with features like search, sorting, and infinite scroll pagination for efficient handling of large datasets.

## Used External Packages

The project utilizes several external packages to provide its functionality and enhance the development experience:

- **Next.js**: React framework for production.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **shadcn/ui**: A collection of re-usable components built using Radix UI and Tailwind CSS.
- **Lucide React**: A collection of beautiful open-source icons.
- **Recharts**: A composable charting library built on React components.
- **Class Variance Authority (cva)** and **clsx**: Utilities for constructing dynamic class names with Tailwind CSS.
- **Tailwind Merge**: Merges Tailwind CSS classes without style conflicts.
- **Geist, Geist Mono (Next.js Fonts)**: Optimized custom fonts.

## Implemented Features

- **Skeleton Loaders**: Implemented skeleton loading states for `TimerControl`, `LiveMetrics`, `RealTimeChart`, `NotificationsPanel`, and `VirtualDataTable` to improve perceived performance during data fetching or component loading.
- **Lazy Loading (Dynamic Imports)**: Main dashboard components are dynamically imported using `React.lazy` and `Suspense` to reduce the initial bundle size and improve load times.
- **Debouncing**: A custom `useDebounce` hook is implemented to optimize input handling (e.g., search in the data table), reducing the frequency of re-renders and API calls.
- **Infinite Scroll Pagination**: The `VirtualDataTable` features infinite scrolling, loading additional data and displaying a refresh spinner as the user scrolls down, ensuring a smooth user experience with large datasets.
- **Custom 404 Page**: A `not-found.tsx` file is implemented to display a custom and animated 404 page for invalid routes, improving user experience.
- **Mobile-Friendly Horizontal Scrolling**: The `VirtualDataTable` now supports horizontal scrolling for both its header and rows on mobile devices, ensuring full data visibility and usability on smaller screens.
