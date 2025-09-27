import React from 'react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="dashboard-layout">
            {/* Add header, sidebar, etc. here if needed */}
            <main>{children}</main>
        </div>
    );
};

export default DashboardLayout;