# Esquema de Base de Datos — INCyTEA

> Diseñado para MySQL Workbench.  
> Basado en las entidades de la SPA `src/pages/`.

---

## 1. Tabla: `roles`

Catálogo de roles del sistema.

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `role_id` | `VARCHAR(20)` | `PK` | Identificador único del rol (ej. `admin`) |
| `label` | `VARCHAR(50)` | `NOT NULL` | Nombre visible (ej. `Administrador`) |
| `permissions` | `JSON` | `NOT NULL` | Lista de rutas a las que tiene acceso |

**Datos iniciales:**

```sql
INSERT INTO roles (role_id, label, permissions) VALUES
('admin',     'Administrador',       JSON_ARRAY('dashboard','vehicular','caseta','admin','dirysec')),
('direccion', 'Dirección/Secretaría',JSON_ARRAY('dashboard','vehicular','dirysec')),
('vehicular', 'Control Vehicular',   JSON_ARRAY('dashboard','vehicular')),
('caseta',    'Caseta',              JSON_ARRAY('dashboard','caseta'));
```

---

## 2. Tabla: `personal`

Cuentas del personal institucional (CRUD en `Admin.jsx`).

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `INT UNSIGNED` | `PK AUTO_INCREMENT` | Identificador único |
| `name` | `VARCHAR(120)` | `NOT NULL` | Nombre completo |
| `role_id` | `VARCHAR(20)` | `FK → roles.role_id` | Rol asignado |
| `direccion` | `VARCHAR(120)` | `NULL` | Nombre de la dirección (solo para rol `direccion`) |
| `phone` | `VARCHAR(30)` | `NOT NULL` | Teléfono |
| `email` | `VARCHAR(100)` | `NOT NULL UNIQUE` | Correo electrónico |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Hash de la contraseña |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Fecha de creación |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Última modificación |

**Datos iniciales (mock):**

```sql
INSERT INTO personal (name, role_id, direccion, phone, email, password_hash) VALUES
('Carlos Ruiz',      'admin',     '+52 (555) 123-4567', 'carlos.ruiz@institucion.edu',  SHA2('password12345', 256)),
('Lucía Fernández',  'direccion', 'Secretaría Académica', '+52 (555) 987-6543', 'lucia.f@institucion.edu',      SHA2('password12345', 256)),
('Miguel Herrera',   'vehicular', '+52 (555) 456-7890', 'miguel.h@institucion.edu',     SHA2('password12345', 256)),
('Sofía Gómez',      'caseta',    '+52 (555) 789-0123', 'sofia.g@institucion.edu',      SHA2('password12345', 256));
```

---

## 3. Tabla: `vehiculos`

Inventario de vehículos institucionales (`Vehicular.jsx`).

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `INT UNSIGNED` | `PK AUTO_INCREMENT` | Identificador único |
| `placa` | `VARCHAR(15)` | `NOT NULL UNIQUE` | Placa |
| `modelo` | `VARCHAR(80)` | `NOT NULL` | Marca, modelo y año |
| `status` | `ENUM('DISPONIBLE','EN USO','EN MANTENIMIENTO','FUERA DE SERVICIO')` | `NOT NULL DEFAULT 'DISPONIBLE'` | Estado actual |
| `type` | `VARCHAR(20)` | `NOT NULL` | Tipo (pickup, car, bus, etc.) |
| `fuel` | `TINYINT UNSIGNED` | `NOT NULL DEFAULT 0` | Porcentaje de combustible (0–100) |
| `odometro` | `INT UNSIGNED` | `NOT NULL DEFAULT 0` | Kilometraje actual |
| `prox_servicio` | `INT UNSIGNED` | `NOT NULL DEFAULT 0` | Km restantes para mantenimiento |
| `activo_id` | `VARCHAR(20)` | `NOT NULL` | Número de activo institucional |
| `combustible_tipo` | `VARCHAR(30)` | `NOT NULL` | Tipo de combustible |
| `custodio` | `VARCHAR(100)` | `NOT NULL` | Custodio asignado |
| `ultima_insp` | `DATE` | `NULL` | Fecha de última inspección |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | |

**Datos iniciales:**

```sql
INSERT INTO vehiculos (placa, modelo, status, type, fuel, odometro, prox_servicio, activo_id, combustible_tipo, custodio, ultima_insp) VALUES
('ABC-1234', 'Toyota Hilux 2023',  'DISPONIBLE', 'pickup', 75, 12450, 2550,  'INC-V-088', 'Alto Octanaje', 'Ing. Mario Domínguez', '2024-10-24'),
('XYZ-5678', 'Nissan NP300 2022',  'EN USO',     'pickup', 45, 22100, 1800,  'INC-V-091', 'Diésel',        'Lic. Ana Méndez',     '2025-01-15'),
('DEF-9012', 'Chevrolet Tornado',  'DISPONIBLE', 'car',    90,  8900, 4200,  'INC-V-073', 'Alto Octanaje', 'Ing. Luis Vega',      '2025-03-02');
```

---

## 4. Tabla: `solicitudes_salida`

Solicitudes de salida de vehículos (`Vehicular.jsx`).

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `INT UNSIGNED` | `PK AUTO_INCREMENT` | Identificador único |
| `folio` | `VARCHAR(20)` | `NOT NULL UNIQUE` | Folio de solicitud (ej. `2026-0089`) |
| `solicitante` | `VARCHAR(120)` | `NOT NULL` | Nombre del solicitante |
| `departamento` | `VARCHAR(60)` | `NOT NULL` | Departamento |
| `destino` | `TEXT` | `NOT NULL` | Lugar de destino |
| `fecha` | `DATE` | `NOT NULL` | Fecha de salida |
| `hora_salida` | `TIME` | `NOT NULL` | Hora de salida |
| `status` | `ENUM('PENDIENTE','APROBADO','RECHAZADO','FINALIZADO')` | `NOT NULL DEFAULT 'PENDIENTE'` | Estado |
| `vehiculo_id` | `INT UNSIGNED` | `FK → vehiculos.id` | Vehículo asignado (nullable hasta aprobación) |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | |

**Datos iniciales:**

```sql
INSERT INTO solicitudes_salida (folio, solicitante, departamento, destino, fecha, hora_salida, status) VALUES
('2026-0089', 'Juan Pérez',     'Sistemas',   'Centro de Datos, Sucursal Centro', '2026-06-04', '10:00:00', 'PENDIENTE'),
('2026-0090', 'María López',   'RH',         'Oficinas Centrales',               '2026-06-05', '09:30:00', 'APROBADO'),
('2026-0091', 'Pedro García',  'Logística',  'Almacén General',                  '2026-06-03', '14:00:00', 'FINALIZADO');
```

---

## 5. Tabla: `pases_activos`

Vehículos actualmente fuera de las instalaciones (`Caseta.jsx` — `activePasses`).

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `VARCHAR(10)` | `PK` | Identificador del pase (ej. `8841`) |
| `vehiculo_id` | `INT UNSIGNED` | `FK → vehiculos.id` | Vehículo |
| `plates` | `VARCHAR(15)` | `NOT NULL` | Placas |
| `out_time` | `DATETIME` | `NOT NULL` | Fecha y hora de salida |
| `auth_code` | `VARCHAR(30)` | `NOT NULL` | Código de autorización |
| `initial_km` | `INT UNSIGNED` | `NOT NULL` | Km al salir |
| `fuel` | `VARCHAR(10)` | `NOT NULL` | Porcentaje de combustible al salir |

**Datos iniciales:**

```sql
INSERT INTO pases_activos (id, vehiculo_id, plates, out_time, auth_code, initial_km, fuel) VALUES
('8841', 1, 'XPZ-992-K', '2026-06-11 06:15:00', 'AUTH-INST-0041', 44210, '75%');
```

---

## 6. Tabla: `pases_historial`

Bitácora de movimientos completados (`Caseta.jsx` — `history`).

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `VARCHAR(10)` | `PK` | Identificador del pase |
| `vehiculo_id` | `INT UNSIGNED` | `FK → vehiculos.id` | Vehículo |
| `plates` | `VARCHAR(15)` | `NOT NULL` | Placas |
| `out_time` | `DATETIME` | `NOT NULL` | Fecha y hora de salida |
| `in_time` | `DATETIME` | `NOT NULL` | Fecha y hora de regreso |
| `initial_km` | `INT UNSIGNED` | `NOT NULL` | Km al salir |
| `final_km` | `INT UNSIGNED` | `NOT NULL` | Km al regresar |
| `status` | `VARCHAR(30)` | `NOT NULL DEFAULT 'Completado'` | Estado |

**Datos iniciales:**

```sql
INSERT INTO pases_historial (id, vehiculo_id, plates, out_time, in_time, initial_km, final_km) VALUES
('8839', 2, 'XYZ-123-A', '2026-06-10 07:00:00', '2026-06-10 11:30:00', 55000, 55030);
```

---

## 7. Tabla: `pases_pendientes`

Pases preautorizados que aún no han salido (`Caseta.jsx` — `pendingPasses`).

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `INT UNSIGNED` | `PK AUTO_INCREMENT` | Identificador único |
| `auth_code` | `VARCHAR(30)` | `NOT NULL UNIQUE` | Código de autorización |
| `vehiculo_id` | `INT UNSIGNED` | `FK → vehiculos.id` | Vehículo |
| `plates` | `VARCHAR(15)` | `NOT NULL` | Placas |
| `initial_km` | `INT UNSIGNED` | `NOT NULL` | Km actual |
| `fuel` | `VARCHAR(10)` | `NOT NULL` | Combustible actual |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | |

**Datos iniciales:**

```sql
INSERT INTO pases_pendientes (auth_code, vehiculo_id, plates, initial_km, fuel) VALUES
('AUTH-0050', 3, 'TYU-881-M', 152000, '100%');
```

---

## 8. Tabla: `permisos_salida`

Formularios de permiso generados en Dirección/Secretaría (`DirySec.jsx`).

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `INT UNSIGNED` | `PK AUTO_INCREMENT` | Identificador único |
| `folio` | `VARCHAR(20)` | `NOT NULL UNIQUE` | Folio del permiso |
| `fecha` | `DATE` | `NOT NULL` | Fecha de solicitud |
| `departamento` | `VARCHAR(60)` | `NOT NULL` | Departamento |
| `nombre_solicitante` | `VARCHAR(120)` | `NOT NULL` | Solicitante |
| `asunto` | `TEXT` | `NOT NULL` | Motivo de la salida |
| `tiempo_estimado` | `VARCHAR(50)` | `NOT NULL` | Duración estimada |
| `destino` | `TEXT` | `NOT NULL` | Lugar de destino |
| `hora_salida` | `TIME` | `NOT NULL` | Hora de salida programada |
| `hora_retorno` | `TIME` | `NOT NULL` | Hora de retorno programada |
| `nombre_autoriza` | `VARCHAR(120)` | `NOT NULL` | Quién autoriza |
| `firma_salida` | `LONGTEXT` | `NULL` | Firma de salida (base64) |
| `firma_regreso` | `LONGTEXT` | `NULL` | Firma de regreso (base64) |
| `firma_autorizacion` | `LONGTEXT` | `NULL` | Firma de autorización (base64) |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | |

---

## Relaciones (Diagrama)

```
roles  ──<  personal           (role_id)
vehiculos ──< solicitudes_salida (vehiculo_id)
vehiculos ──< pases_activos      (vehiculo_id)
vehiculos ──< pases_historial    (vehiculo_id)
vehiculos ──< pases_pendientes   (vehiculo_id)
```

---

## Script completo DDL

```sql
-- ============================================================
-- INCyTEA — Esquema completo
-- ============================================================

CREATE DATABASE IF NOT EXISTS incytea
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE incytea;

-- -----------------------------------------------------------
-- 1. roles
-- -----------------------------------------------------------
CREATE TABLE roles (
  role_id     VARCHAR(20)   NOT NULL PRIMARY KEY,
  label       VARCHAR(50)   NOT NULL,
  permissions JSON          NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- 2. personal
-- -----------------------------------------------------------
CREATE TABLE personal (
  id            INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(120)    NOT NULL,
  role_id       VARCHAR(20)     NOT NULL,
  direccion     VARCHAR(120)    DEFAULT NULL COMMENT 'Solo para rol direccion',
  phone         VARCHAR(30)     NOT NULL,
  email         VARCHAR(100)    NOT NULL UNIQUE,
  password_hash VARCHAR(255)    NOT NULL,
  created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (role_id) REFERENCES roles(role_id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- 3. vehiculos
-- -----------------------------------------------------------
CREATE TABLE vehiculos (
  id               INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
  placa            VARCHAR(15)     NOT NULL UNIQUE,
  modelo           VARCHAR(80)     NOT NULL,
  status           ENUM('DISPONIBLE','EN USO','EN MANTENIMIENTO','FUERA DE SERVICIO')
                                   NOT NULL DEFAULT 'DISPONIBLE',
  type             VARCHAR(20)     NOT NULL,
  fuel             TINYINT UNSIGNED NOT NULL DEFAULT 0,
  odometro         INT UNSIGNED    NOT NULL DEFAULT 0,
  prox_servicio    INT UNSIGNED    NOT NULL DEFAULT 0,
  activo_id        VARCHAR(20)     NOT NULL,
  combustible_tipo VARCHAR(30)     NOT NULL,
  custodio         VARCHAR(100)    NOT NULL,
  ultima_insp      DATE            DEFAULT NULL,
  created_at       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- 4. solicitudes_salida
-- -----------------------------------------------------------
CREATE TABLE solicitudes_salida (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  folio         VARCHAR(20)   NOT NULL UNIQUE,
  solicitante   VARCHAR(120)  NOT NULL,
  departamento  VARCHAR(60)   NOT NULL,
  destino       TEXT          NOT NULL,
  fecha         DATE          NOT NULL,
  hora_salida   TIME          NOT NULL,
  status        ENUM('PENDIENTE','APROBADO','RECHAZADO','FINALIZADO')
                              NOT NULL DEFAULT 'PENDIENTE',
  vehiculo_id   INT UNSIGNED  DEFAULT NULL,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- 5. pases_activos
-- -----------------------------------------------------------
CREATE TABLE pases_activos (
  id          VARCHAR(10)   NOT NULL PRIMARY KEY,
  vehiculo_id INT UNSIGNED  NOT NULL,
  plates      VARCHAR(15)   NOT NULL,
  out_time    DATETIME      NOT NULL,
  auth_code   VARCHAR(30)   NOT NULL,
  initial_km  INT UNSIGNED  NOT NULL,
  fuel        VARCHAR(10)   NOT NULL,

  FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- 6. pases_historial
-- -----------------------------------------------------------
CREATE TABLE pases_historial (
  id          VARCHAR(10)   NOT NULL PRIMARY KEY,
  vehiculo_id INT UNSIGNED  NOT NULL,
  plates      VARCHAR(15)   NOT NULL,
  out_time    DATETIME      NOT NULL,
  in_time     DATETIME      NOT NULL,
  initial_km  INT UNSIGNED  NOT NULL,
  final_km    INT UNSIGNED  NOT NULL,
  status      VARCHAR(30)   NOT NULL DEFAULT 'Completado',

  FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- 7. pases_pendientes
-- -----------------------------------------------------------
CREATE TABLE pases_pendientes (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  auth_code   VARCHAR(30)   NOT NULL UNIQUE,
  vehiculo_id INT UNSIGNED  NOT NULL,
  plates      VARCHAR(15)   NOT NULL,
  initial_km  INT UNSIGNED  NOT NULL,
  fuel        VARCHAR(10)   NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- 8. permisos_salida
-- -----------------------------------------------------------
CREATE TABLE permisos_salida (
  id                  INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  folio               VARCHAR(20)   NOT NULL UNIQUE,
  fecha               DATE          NOT NULL,
  departamento        VARCHAR(60)   NOT NULL,
  nombre_solicitante  VARCHAR(120)  NOT NULL,
  asunto              TEXT          NOT NULL,
  tiempo_estimado     VARCHAR(50)   NOT NULL,
  destino             TEXT          NOT NULL,
  hora_salida         TIME          NOT NULL,
  hora_retorno        TIME          NOT NULL,
  nombre_autoriza     VARCHAR(120)  NOT NULL,
  firma_salida        LONGTEXT      DEFAULT NULL,
  firma_regreso       LONGTEXT      DEFAULT NULL,
  firma_autorizacion  LONGTEXT      DEFAULT NULL,
  created_at          TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
