'use client';

import { useEffect, useState, useCallback } from 'react';

import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

type ThemeBtnProps = {
  dark: boolean;
};

export default function ThemeBtn({ dark }: ThemeBtnProps) {
  const [mode, setMode] = useState<boolean>(dark);

  useEffect(() => {
    handleChangeTheme();
  }, [mode]);

  const handleChangeTheme = () => {
    if (!mode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    document.cookie = `dark=${mode}; max-age=${3600}`;
  };

  return (
    <div>
      <button onClick={() => setMode(!mode)}>
        {mode ? (
          <MdOutlineLightMode className="w-6 h-auto" />
        ) : (
          <MdDarkMode className="w-6 h-auto" />
        )}
      </button>
    </div>
  );
}
