import Settings from "./settings/page";
import SamSeed from "./samSeed/page";
import NotifyItemList from "@/components/popUps/notifyItemList/page";
import { useParamsStore } from '@/core/stores/paramsStore';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function PopUps() {
    const { params, syncFromURL } = useParamsStore();
    const location = useLocation();

    useEffect(() => {
        syncFromURL();
    }, [location.search]);

    return (
        <AnimatePresence>
            {params.settings === 'open' && (
                <Settings />
            )}
            {params.samSeed === 'open' && (
                <SamSeed />
            )}
            {params.notifyItemList === 'open' && (
                <NotifyItemList />
            )}
        </AnimatePresence>
    )
}