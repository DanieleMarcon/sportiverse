/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./apps/*/src/**/*.{js,ts,jsx,tsx}",
    "./packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "./packages/*/src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Design tokens integration
      colors: {
        primary: {
          50: 'rgb(var(--clr-primary-50) / <alpha-value>)',
          100: 'rgb(var(--clr-primary-100) / <alpha-value>)',
          200: 'rgb(var(--clr-primary-200) / <alpha-value>)',
          300: 'rgb(var(--clr-primary-300) / <alpha-value>)',
          400: 'rgb(var(--clr-primary-400) / <alpha-value>)',
          500: 'rgb(var(--clr-primary-500) / <alpha-value>)',
          600: 'rgb(var(--clr-primary-600) / <alpha-value>)',
          700: 'rgb(var(--clr-primary-700) / <alpha-value>)',
          800: 'rgb(var(--clr-primary-800) / <alpha-value>)',
          900: 'rgb(var(--clr-primary-900) / <alpha-value>)',
          950: 'rgb(var(--clr-primary-950) / <alpha-value>)'
        },
        secondary: {
          50: 'rgb(var(--clr-secondary-50) / <alpha-value>)',
          100: 'rgb(var(--clr-secondary-100) / <alpha-value>)',
          200: 'rgb(var(--clr-secondary-200) / <alpha-value>)',
          300: 'rgb(var(--clr-secondary-300) / <alpha-value>)',
          400: 'rgb(var(--clr-secondary-400) / <alpha-value>)',
          500: 'rgb(var(--clr-secondary-500) / <alpha-value>)',
          600: 'rgb(var(--clr-secondary-600) / <alpha-value>)',
          700: 'rgb(var(--clr-secondary-700) / <alpha-value>)',
          800: 'rgb(var(--clr-secondary-800) / <alpha-value>)',
          900: 'rgb(var(--clr-secondary-900) / <alpha-value>)',
          950: 'rgb(var(--clr-secondary-950) / <alpha-value>)'
        },
        accent: {
          50: 'rgb(var(--clr-accent-50) / <alpha-value>)',
          100: 'rgb(var(--clr-accent-100) / <alpha-value>)',
          200: 'rgb(var(--clr-accent-200) / <alpha-value>)',
          300: 'rgb(var(--clr-accent-300) / <alpha-value>)',
          400: 'rgb(var(--clr-accent-400) / <alpha-value>)',
          500: 'rgb(var(--clr-accent-500) / <alpha-value>)',
          600: 'rgb(var(--clr-accent-600) / <alpha-value>)',
          700: 'rgb(var(--clr-accent-700) / <alpha-value>)',
          800: 'rgb(var(--clr-accent-800) / <alpha-value>)',
          900: 'rgb(var(--clr-accent-900) / <alpha-value>)',
          950: 'rgb(var(--clr-accent-950) / <alpha-value>)'
        },
        success: {
          50: 'rgb(var(--clr-success-50) / <alpha-value>)',
          100: 'rgb(var(--clr-success-100) / <alpha-value>)',
          200: 'rgb(var(--clr-success-200) / <alpha-value>)',
          300: 'rgb(var(--clr-success-300) / <alpha-value>)',
          400: 'rgb(var(--clr-success-400) / <alpha-value>)',
          500: 'rgb(var(--clr-success-500) / <alpha-value>)',
          600: 'rgb(var(--clr-success-600) / <alpha-value>)',
          700: 'rgb(var(--clr-success-700) / <alpha-value>)',
          800: 'rgb(var(--clr-success-800) / <alpha-value>)',
          900: 'rgb(var(--clr-success-900) / <alpha-value>)',
          950: 'rgb(var(--clr-success-950) / <alpha-value>)'
        },
        warning: {
          50: 'rgb(var(--clr-warning-50) / <alpha-value>)',
          100: 'rgb(var(--clr-warning-100) / <alpha-value>)',
          200: 'rgb(var(--clr-warning-200) / <alpha-value>)',
          300: 'rgb(var(--clr-warning-300) / <alpha-value>)',
          400: 'rgb(var(--clr-warning-400) / <alpha-value>)',
          500: 'rgb(var(--clr-warning-500) / <alpha-value>)',
          600: 'rgb(var(--clr-warning-600) / <alpha-value>)',
          700: 'rgb(var(--clr-warning-700) / <alpha-value>)',
          800: 'rgb(var(--clr-warning-800) / <alpha-value>)',
          900: 'rgb(var(--clr-warning-900) / <alpha-value>)',
          950: 'rgb(var(--clr-warning-950) / <alpha-value>)'
        },
        error: {
          50: 'rgb(var(--clr-error-50) / <alpha-value>)',
          100: 'rgb(var(--clr-error-100) / <alpha-value>)',
          200: 'rgb(var(--clr-error-200) / <alpha-value>)',
          300: 'rgb(var(--clr-error-300) / <alpha-value>)',
          400: 'rgb(var(--clr-error-400) / <alpha-value>)',
          500: 'rgb(var(--clr-error-500) / <alpha-value>)',
          600: 'rgb(var(--clr-error-600) / <alpha-value>)',
          700: 'rgb(var(--clr-error-700) / <alpha-value>)',
          800: 'rgb(var(--clr-error-800) / <alpha-value>)',
          900: 'rgb(var(--clr-error-900) / <alpha-value>)',
          950: 'rgb(var(--clr-error-950) / <alpha-value>)'
        }
      },
      borderRadius: {
        'xs': 'var(--rad-xs)',
        'sm': 'var(--rad-sm)',
        'md': 'var(--rad-md)',
        'lg': 'var(--rad-lg)',
        'xl': 'var(--rad-xl)',
        '2xl': 'var(--rad-2xl)',
        '3xl': 'var(--rad-3xl)'
      },
      spacing: {
        '0.5': 'var(--sp-0-5)',
        '1': 'var(--sp-1)',
        '1.5': 'var(--sp-1-5)',
        '2': 'var(--sp-2)',
        '2.5': 'var(--sp-2-5)',
        '3': 'var(--sp-3)',
        '3.5': 'var(--sp-3-5)',
        '4': 'var(--sp-4)',
        '5': 'var(--sp-5)',
        '6': 'var(--sp-6)',
        '7': 'var(--sp-7)',
        '8': 'var(--sp-8)',
        '9': 'var(--sp-9)',
        '10': 'var(--sp-10)',
        '11': 'var(--sp-11)',
        '12': 'var(--sp-12)',
        '14': 'var(--sp-14)',
        '16': 'var(--sp-16)',
        '20': 'var(--sp-20)',
        '24': 'var(--sp-24)',
        '28': 'var(--sp-28)',
        '32': 'var(--sp-32)',
        '36': 'var(--sp-36)',
        '40': 'var(--sp-40)',
        '44': 'var(--sp-44)',
        '48': 'var(--sp-48)',
        '52': 'var(--sp-52)',
        '56': 'var(--sp-56)',
        '60': 'var(--sp-60)',
        '64': 'var(--sp-64)',
        '72': 'var(--sp-72)',
        '80': 'var(--sp-80)',
        '96': 'var(--sp-96)'
      },
      fontSize: {
        'xs': ['var(--fs-xs)', { lineHeight: 'var(--lh-xs)' }],
        'sm': ['var(--fs-sm)', { lineHeight: 'var(--lh-sm)' }],
        'base': ['var(--fs-base)', { lineHeight: 'var(--lh-base)' }],
        'lg': ['var(--fs-lg)', { lineHeight: 'var(--lh-lg)' }],
        'xl': ['var(--fs-xl)', { lineHeight: 'var(--lh-xl)' }],
        '2xl': ['var(--fs-2xl)', { lineHeight: 'var(--lh-2xl)' }],
        '3xl': ['var(--fs-3xl)', { lineHeight: 'var(--lh-3xl)' }],
        '4xl': ['var(--fs-4xl)', { lineHeight: 'var(--lh-4xl)' }],
        '5xl': ['var(--fs-5xl)', { lineHeight: 'var(--lh-5xl)' }],
        '6xl': ['var(--fs-6xl)', { lineHeight: 'var(--lh-6xl)' }]
      },
      fontFamily: {
        sans: ['var(--ff-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--ff-mono)', 'monospace']
      },
      boxShadow: {
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        }
      }
    }
  },
  plugins: [
    // Plugin per utilities personalizzate
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance'
        },
        '.text-pretty': {
          'text-wrap': 'pretty'
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: theme('colors.gray.100')
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme('colors.gray.300'),
            'border-radius': '4px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme('colors.gray.400')
          }
        }
      }
      addUtilities(newUtilities)
    }
  ]
}