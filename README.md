# Tag search

VS Code extension that provides helper commands to find notes with all or some of the tags you specify.

## Motivation
This extension was created to help scratch an itch with using [Dendron](https://github.com/dendronhq/dendron). When using tags in notes, there's no convenient helper/feature to quickly find notes using the same tag (at the time of writing this extension).
So this extension provides two commands `tag-search.findSomeTags` and `tag-search.findAllTags`, which prompt the user for a comma separated list of tags and open the VS Code search editor for you with the `query` and `includes` fields prefilled.

## Tips
You can assign keybindings in the VS Code `Keyboard Shortcuts` preferences (`Ctrl+K Ctrl+S`) if you use the commands often.