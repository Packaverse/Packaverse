#  Polishing Your Pack: Custom Texts

A great texture pack is more than just re-textured blocks and items. You can make your pack feel truly unique by customizing the text that appears in the game. This guide will show you how to change the yellow splash text on the main menu and the helpful tips on the loading screens.

---

##  Adding Splashes of Personality with `splashes.json`

The iconic yellow text that flashes on the Minecraft title screen is easily customizable. You can add your own phrases, jokes, or whatever you can imagine!

### 1. File Location

To get started, you'll need to create a new folder and a file within your resource pack:

*   In your pack's main directory, create a folder named `texts`.
*   Inside ur packs folder, create a new file and name it `splashes.json`.

Your pack structure should now include:

```
My Awesome Pack/
├── manifest.json
├── pack_icon.png
└── splashes.json
└── textures/
```

### 2. Structuring `splashes.json`

Open `splashes.json` in a text editor. The file uses a simple JSON format to list all your custom splash texts.

Here's an example of what the code should look like:

```json
{
  "splashes": [
    "Your first custom splash!",
    "Made with love!",
    "So shiny!",
    "§dColorful text is cool!§r"
  ]
}
```

**Breakdown of the structure:**

*   **`"splashes": [ ... ]`**: This is an array that holds all of your splash text entries.
*   **`"Your text here"`**: Each entry is a string enclosed in double quotes.
*   **Comma Separation**: Every splash text entry must be separated by a comma, except for the very last one.

### 3. Adding Color and Formatting

You can make your text even more dynamic by adding colors and formatting. This is done using the section symbol (`§`) followed by a formatting code.

*   To use colors, add `§` and a color code before your text. For example, `§d` creates pink text.
*   To reset the formatting and return to the default yellow, use `§r`.
*   You can find a full list of Minecraft color codes online.

**Example with color:**

```json
{
  "splashes": [
    "§aGreen is the best!",
    "What about §cRed§r?",
    "§lBold and Gold!§r"
  ]
}
```

---

##  Customizing Loading Screen Messages with `loading_messages.json`

You can also change the helpful (or sometimes silly) messages that appear while a world is loading.

### 1. File Location

Similar to the splash texts, the loading messages have their own dedicated file:

*   Inside the same `texts` folder, create a new file named `loading_messages.json`.

Your texture pack folder will now contain:

```
texture_pack/
├── loading_messages.json
└── splashes.json
```

### 2. Structuring `loading_messages.json`

The structure for `loading_messages.json` is almost identical to `splashes.json`. It's a simple list of strings.

```json
{
  "messages": [
    "Finding the best blocks...",
    "Pro-tip: Don't dig straight down!",
    "Building amazing things takes time.",
    "Did you remember to bring snacks?"
  ]
}
```

**Breakdown of the structure:**

*   **`"messages": [ ... ]`**: An array that holds all your custom loading screen messages.
*   **`"Your message here"`**: Each message is a string in double quotes.
*   **Comma Separation**: Just like with splashes, each entry needs a comma after it, except for the last one.

By editing these simple text files, you can add a significant layer of personality and charm to your texture pack, making the Minecraft experience uniquely yours.