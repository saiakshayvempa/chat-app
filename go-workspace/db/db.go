package db

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql" // Import MySQL driver
)

const (
	host     = "localhost"
	port     = 3306 // MySQL default port
	user     = "root"
	password = "root"
	dbname   = "chatapp"
)

func ConnectDB() (*sql.DB, error) {
	// Format MySQL connection string
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", user, password, host, port, dbname)

	// Open the connection using the MySQL driver
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	// Optional: Ping the database to verify connection
	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}
