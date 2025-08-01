# Creating and Using Subpacks

Subpacks let you add multiple themes or variations into one resource pack, which users can switch between in the game's settings.

---

### 1. Folder Structure

First, create a `subpacks` folder in the root of your pack. Inside it, create a folder for each option you want to offer. These folders will contain only the assets that are different for that specific subpack.

```
My Pack/
├── subpacks/
│   ├── blue_theme/
│   │   └── textures/ui/hotbar.png
│   └── red_theme/
│       └── textures/ui/hotbar.png
├── manifest.json
└── textures/
    └── blocks/stone.png
```

### 2. `manifest.json` Configuration

Next, define your subpacks in the `manifest.json` file. This tells Minecraft what options to show in the settings menu. Add a `subpacks` array to your manifest like this:

```json
{
  "format_version": 2,
  "header": { ... },
  "modules": [ ... ],
  "subpacks": [
    {
      "folder_name": "blue_theme",
      "name": "Blue Theme",
      "memory_tier": 0
    },
    {
      "folder_name": "red_theme",
      "name": "Red Theme",
      "memory_tier": 1
    }
  ]
}
```

#### Subpack Key Definitions

| Key | Description |
| :--- | :--- |
| `folder_name` | The exact name of the folder inside `/subpacks`. |
| `name` | The text shown to the user in the settings slider. |
| `memory_tier` | The order on the slider. `0` is the default option. |

### 3. How It Works

When a user selects a subpack:

*   The game first looks for assets inside that subpack's folder (e.g., `subpacks/blue_theme/`).
*   If an asset is not found there, the game uses the base asset from the main `textures` folder at the root of the pack.

This means you only need to include the files that are different for each subpack, making your pack efficient.