export function slugify(text: string): string {
    return text.toLocaleLowerCase().trim().replace(" ", "-")
}