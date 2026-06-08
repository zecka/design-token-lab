## Color level
A lot of design system have multiple level of semantic color, like base and soft


## Disabled state
There is multiple approach regarding the disabled state:

### Play with opacity (HERO UI)
[HERO UI](https://heroui.com/en/docs/react/components/button#disabled-state)
```css
--cursor-disabled: not-alowed;
--disabled-opacity: .5;
```

### Dedicated color
- PrimeNG: https://primeng.org/button#disabled
- RadixUI: https://www.radix-ui.com/themes/playground#button



## State tokens

### Color mix with foreground (HERO UI)

By default state token doesnt need a custom token, but they still can be override

```css
:root{
    --accent: oklch(62.04% 0.1950 253.83);
    --accent-foreground: oklch(99.11% 0 0);
    --accent-hover: color-mix(in oklab, var(--accent) 90%, var(--accent-foreground) 10%);
    --accent-soft: color-mix(in oklab, var(--accent) 15%, transparent);
    --accent-soft-foreground: color-mix(in oklab, var(--accent) 70%, var(--foreground) 30%);
    --accent-soft-hover: color-mix(in oklab, var(--accent) 20%, transparent);
}
```

### Color mix with transparent (SHADCN)
There is no way to override hover color for a specific theme.
Hover background is always --base at 30% opacity 
```css
.component {
    color: var(--destructive);
    background-color: color-mix(in oklab, var(--destructive) 10%, transparent);
    &:hover{
       background-color: color-mix(in oklab, var(--destructive) 30%, transparent);
    }
}
```
