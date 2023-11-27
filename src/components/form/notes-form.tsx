import { debounce } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { ClickAwayListener } from '@mui/base';
import useScreenResolution from '@/hooks/use-screen-resolution';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

const NotesForm = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<string | undefined>(
    '# This is some markdown \n - And some more ',
  );

  const { isMobileResolution } = useScreenResolution();

  const preview = useCallback(() => {
    setEditing(false);
  }, []);

  const debouncedPreview = useMemo(() => debounce(preview, 5000), [preview]);

  const handleClickIn = () => {
    if (!editing) {
      setEditing(true);
    }

    debouncedPreview();
  };

  const handleEdit = (value: string | undefined) => {
    debouncedPreview();
    setValue(value);
  };

  const commands = isMobileResolution ? { commands: [] } : {};

  return (
    <ClickAwayListener onClickAway={() => setEditing(false)}>
      <div className="flex h-full w-full max-w-[900px]" onClick={handleClickIn}>
        {editing ? (
          <MDEditor
            value={value}
            onChange={handleEdit}
            preview="edit"
            className="min-h-[500px] flex-grow xs:min-h-[0]"
            {...commands}
          />
        ) : (
          <MarkdownPreview
            source={value}
            className="min-h-[500px] flex-grow rounded-lg p-4 xs:min-h-[0]"
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default NotesForm;
