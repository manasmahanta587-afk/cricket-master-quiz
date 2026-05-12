import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, R as React, u as useStore, A as AnimatePresence, m as motion, a as useNavigate, D as Difficulty, C as CoinDisplay, S as StreakDisplay, T as Trophy } from "./index-CvZIVcv1.js";
import { c as clsx, a as cn, F as Flame } from "./utils-bGM6sAVA.js";
import { u as useLoginOrRegister } from "./useBackend-n4ovTmqO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const DIFFICULTY_CONFIG = [
  {
    key: Difficulty.Easy,
    label: "Easy",
    emoji: "🟢",
    coins: 10,
    desc: "Basic cricket facts",
    color: "border-green-600/50 bg-green-900/20 hover:border-green-500",
    selectedColor: "border-green-500 bg-green-900/40 ring-2 ring-green-500/30",
    badge: "text-green-400 bg-green-900/50",
    Icon: Star
  },
  {
    key: Difficulty.Medium,
    label: "Medium",
    emoji: "🟡",
    coins: 25,
    desc: "IPL & World Cup history",
    color: "border-primary/40 bg-primary/5 hover:border-primary/70",
    selectedColor: "border-primary bg-primary/10 ring-2 ring-primary/30",
    badge: "text-primary bg-primary/20",
    Icon: Zap
  },
  {
    key: Difficulty.Hard,
    label: "Hard",
    emoji: "🔴",
    coins: 50,
    desc: "Records & rare trivia",
    color: "border-accent/40 bg-accent/5 hover:border-accent/70",
    selectedColor: "border-accent bg-accent/15 ring-2 ring-accent/30",
    badge: "text-accent bg-accent/20",
    Icon: Flame
  }
];
function UsernameForm() {
  const [name, setName] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const { mutate, isPending } = useLoginOrRegister();
  const { setUsername, setProfile } = useStore();
  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Username must be at least 2 characters");
      return;
    }
    if (trimmed.length > 20) {
      setError("Username must be 20 characters or less");
      return;
    }
    setError("");
    mutate(trimmed, {
      onSuccess: (result) => {
        setUsername(trimmed);
        setProfile(result.profile);
      },
      onError: () => {
        setError("Failed to connect. Please try again.");
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, ease: "easeOut" },
      className: "flex flex-col items-center gap-8 py-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { y: -20, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { delay: 0.1, duration: 0.4 },
              className: "text-7xl",
              style: { filter: "drop-shadow(0 0 24px rgba(178,135,52,0.5))" },
              children: "🏆"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { y: 10, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { delay: 0.2, duration: 0.4 },
              className: "text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl leading-tight", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Cricket" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Master" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 font-body", children: "The ultimate cricket trivia challenge" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🏏" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.form,
          {
            initial: { y: 16, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { delay: 0.3, duration: 0.4 },
            onSubmit: handleSubmit,
            className: "flex flex-col gap-4 w-full",
            "data-ocid": "username_form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "username-input",
                    className: "text-sm font-body font-semibold text-foreground",
                    children: "Enter your player name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "username-input",
                    "data-ocid": "username.input",
                    type: "text",
                    placeholder: "e.g. CricketFan99",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    maxLength: 20,
                    autoFocus: true,
                    className: "h-12 bg-card border-border text-foreground placeholder:text-muted-foreground text-base font-body"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0, y: -4 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -4 },
                    transition: { duration: 0.2 },
                    "data-ocid": "username.field_error",
                    className: "text-accent text-xs mt-1 font-body",
                    children: error
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  "data-ocid": "username.submit_button",
                  disabled: isPending || name.trim().length < 2,
                  className: "h-12 w-full button-gold text-base font-display font-bold glow-gold disabled:opacity-50",
                  children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin text-lg", children: "🏏" }),
                    " Joining..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    "Start Playing ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                  ] })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.5, duration: 0.4 },
            className: "grid grid-cols-3 gap-3 w-full text-center",
            children: [
              { icon: "🏅", label: "Earn Coins" },
              { icon: "🔥", label: "Daily Streak" },
              { icon: "🏆", label: "Leaderboard" }
            ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card rounded-xl p-3 border border-border flex flex-col items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: f.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: f.label })
                ]
              },
              f.label
            ))
          }
        )
      ]
    }
  );
}
function HomeContent() {
  const navigate = useNavigate();
  const { profile, difficulty, setDifficulty } = useStore();
  const activeDiff = DIFFICULTY_CONFIG.find((d) => d.key === difficulty) ?? DIFFICULTY_CONFIG[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
      className: "flex flex-col gap-5 py-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { y: -8, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { delay: 0.05, duration: 0.3 },
            "data-ocid": "player_banner",
            className: "bg-card rounded-2xl border border-border p-4 flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.7 0.15 80 / 0.3), oklch(0.55 0.22 25 / 0.3))",
                      border: "2px solid oklch(0.7 0.15 80 / 0.5)"
                    },
                    children: "🧑‍🏏"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Player" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground leading-tight truncate", children: profile == null ? void 0 : profile.username })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1.5 shrink-0", children: [
                profile && /* @__PURE__ */ jsxRuntimeExports.jsx(CoinDisplay, { coins: profile.totalCoins, size: "sm" }),
                profile && /* @__PURE__ */ jsxRuntimeExports.jsx(StreakDisplay, { streak: profile.streak, size: "sm" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: profile && profile.streak > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.95, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.95, opacity: 0 },
            transition: { delay: 0.1, duration: 0.3 },
            "data-ocid": "streak_bonus_banner",
            className: "rounded-xl border border-accent/30 bg-accent/10 p-3 flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🔥" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-body font-semibold text-foreground", children: [
                  profile.streak,
                  " day streak!"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Come back tomorrow for",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "+20 bonus coins!" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-gold text-xs shrink-0", children: [
                "Day ",
                profile.streak
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "difficulty_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Select Difficulty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2.5", children: DIFFICULTY_CONFIG.map((diff, i) => {
            const isSelected = difficulty === diff.key;
            const { Icon } = diff;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                type: "button",
                "data-ocid": `difficulty.${diff.label.toLowerCase()}.toggle`,
                initial: { x: -16, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                transition: { delay: 0.1 + i * 0.07, duration: 0.3 },
                onClick: () => setDifficulty(diff.key),
                className: `w-full rounded-xl border-2 p-4 text-left transition-smooth flex items-center gap-4 ${isSelected ? diff.selectedColor : diff.color}`,
                "aria-pressed": isSelected,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: diff.emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-foreground", children: diff.label }),
                      isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.span,
                        {
                          initial: { scale: 0 },
                          animate: { scale: 1 },
                          className: "text-sm text-primary",
                          children: "✓"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: diff.desc })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1.5 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `text-xs font-mono font-bold px-2 py-0.5 rounded-full ${diff.badge}`,
                        children: [
                          "🪙 ",
                          diff.coins,
                          "/Q"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-muted-foreground" })
                  ] })
                ]
              },
              diff.key
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { y: 12, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { delay: 0.35, duration: 0.3 },
            className: "flex flex-col gap-3 pt-1 pb-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": "start_quiz.primary_button",
                  onClick: () => navigate({ to: "/quiz" }),
                  className: "h-14 w-full button-gold text-lg font-display font-bold glow-gold rounded-2xl",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🏏" }),
                    "Start Quiz — ",
                    activeDiff.label,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  "data-ocid": "nav_leaderboard.secondary_button",
                  onClick: () => navigate({ to: "/leaderboard" }),
                  className: "h-12 w-full border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-smooth rounded-xl",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 mr-2" }),
                    "View Leaderboard"
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Home() {
  const { username } = useStore();
  const hasUser = username.trim().length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "home.page", className: "flex flex-col flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: !hasUser ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, scale: 0.97 },
      transition: { duration: 0.25 },
      className: "flex flex-col flex-1",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsernameForm, {})
    },
    "onboarding"
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
      className: "flex flex-col flex-1",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(HomeContent, {})
    },
    "home"
  ) }) });
}
export {
  Home as default
};
