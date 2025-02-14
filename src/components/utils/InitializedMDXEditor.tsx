"use client"
import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  tablePlugin,
  codeBlockPlugin,
  sandpackPlugin,
  linkDialogPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  type MDXEditorMethods,
  type MDXEditorProps,
  BlockTypeSelect,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  InsertCodeBlock,
  CreateLink,
  InsertTable,
  InsertSandpack,
  InsertThematicBreak,
  ListsToggle,
  ShowSandpackInfo
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        tablePlugin(),
        codeBlockPlugin(),
        linkDialogPlugin(),
        // sandpackPlugin(),
        toolbarPlugin({
            toolbarClassName: 'my-classname',
            toolbarContents: () => (
              <>
                {' '}
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                {/* <ChangeCodeMirrorLanguage /> */}
                <CodeToggle />
                <CreateLink />
                <InsertCodeBlock />
                <InsertTable />
                <InsertSandpack />
                <InsertThematicBreak />
                <ListsToggle />
                {/* <ShowSandpackInfo /> */}
              </>
            )
          })
      ]}
      {...props}
      ref={editorRef}
    />
  )
}