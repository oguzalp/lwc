const memoized = Symbol();
export default function ($api, $cmp, $slotset) {
    const m = $cmp[memoized] || ($cmp[memoized] = {});
    return [$api.h(
        "section",
        {},
        [$api.f([$slotset.test || [$api.h(
            "p",
            {},
            ["Test slot content"]
        )]])]
    )];
}
export const templateUsedIds = [];
