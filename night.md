## A combination of the gradient render AND some material file tweaks. You can achieve the same thing as my
[Toggle Night Vision Texture Pack.](<https://www.curseforge.com/minecraft-bedrock/texture-packs/toggle-night-vision>)

#- I discovered this method while messing around with materials last December and utilized it to do some interesting stuff:
[showcase video](https://www.youtube.com/watch?v=UmA9ZXwsPM4) (color inversion)


Using this material will brighten everything that is under the gradient renderer:
```js
{
    "materials": {
        "version": "1.0.0",
        "ui_fill_gradient:ui_base": {
            "blendSrc": "DestColor",
            "blendDst": "SourceColor"
        }
    }
}
```
Will also affect ALL gradients from other screens. 
You can effectively invert all colors, make them "glow" or "bright". Override their colors and etc

and using some binding visibility, you can make it toggle-able, change opacity using sliders and etc