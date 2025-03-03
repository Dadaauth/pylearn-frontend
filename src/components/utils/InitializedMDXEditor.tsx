"use client"
import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  tablePlugin,
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
  CodeToggle,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  codeBlockPlugin,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  SandpackConfig,
  sandpackPlugin,
  codeMirrorPlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'


const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
    }
  ]
}

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        tablePlugin(),
        linkDialogPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', python: 'Python', c: "C" } }),
        toolbarPlugin({
            toolbarClassName: 'my-classname',
            toolbarContents: () => (
              <>
                {' '}
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <CodeToggle />
                <CreateLink />
                <InsertTable />
                <InsertThematicBreak />
                <ListsToggle />
                <ConditionalContents
                  options={[
                    { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                    { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                          <InsertSandpack />
                        </>
                      )
                    }
                  ]}
                />
              </>
            )
          })
      ]}
      {...props}
      ref={editorRef}
    />
  )
}