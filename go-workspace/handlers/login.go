package handlers

import (
	"net/http"

	"go-workspace/db"

	"github.com/gin-gonic/gin"
)

func LoginData(c *gin.Context) {
	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()

	rows, err := dbConn.Query("SELECT l.id, l.name, l.password,l.people_id FROM logins l")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}
	defer rows.Close()

	var data []map[string]interface{}
	for rows.Next() {
		var id, people_id int
		var name, password string
		err := rows.Scan(&id, &name, &password, &people_id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read row"})
			return
		}
		data = append(data, map[string]interface{}{"id": id, "name": name, "password": password, "people_id": people_id})
	}

	c.JSON(http.StatusOK, data)
}
