class WeakPassword(ValueError):
    """La contraseña no cumple los requisitos de complejidad."""
    pass


class DuplicateEmail(ValueError):
    """El e-mail ya está registrado en la base de datos."""
    pass


class InvalidCredentials(ValueError):
    """E-mail o contraseña incorrectos en el inicio de sesión."""
    pass

class DeviceNotFound(ValueError):
    """No se encontro el device."""
    pass

class OwnershipError(ValueError):
    """El usuario no tiene acceso a ese device."""
    pass