import React from 'react';
import usePWAUpdate from 'hooks/usePWAUpdate';
import UpdateNotification from 'components/reusable/UpdateNotification';
import TokenRefresher from 'components/TokenRefresher';

interface PWAWrapperProps {
    children: React.ReactNode;
}

const PWAWrapper: React.FC<PWAWrapperProps> = ({ children }) => {
    const { isUpdateAvailable, isUpdating, updateServiceWorker } = usePWAUpdate();
    const [dismissed, setDismissed] = React.useState(false);

    const handleUpdate = () => {
        updateServiceWorker();
    };

    const handleDismiss = () => {
        setDismissed(true);
    };

    return (
        <>
            <UpdateNotification
                isVisible={isUpdateAvailable && !dismissed}
                onUpdate={handleUpdate}
                onDismiss={handleDismiss}
                isUpdating={isUpdating}
            />
            <TokenRefresher />
            {children}
        </>
    );
};

export default PWAWrapper;
