"""
Decorators module for the Oykus application.

This module contains all custom decorators used throughout the application.
"""

from .debug import debug_only, dev_only

__all__ = [
    "debug_only",
    "dev_only",
]
