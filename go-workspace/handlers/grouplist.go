package handlers

import (
	
	"net/http"
	"fmt"
	"github.com/gin-gonic/gin"
	"go-workspace/db"
)

func Grouplist(c *gin.Context) {
	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()

	rows, err := dbConn.Query("SELECT id, group_name, admin FROM `groups`")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}
	defer rows.Close()

	var data []map[string]interface{}
	for rows.Next() {
		var id int
		var group_name, admin string
		err := rows.Scan(&id, &group_name, &admin)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read row"})
			return
		}
		data = append(data, map[string]interface{}{"id": id, "group_name": group_name, "group_admin": admin})
	}

	c.JSON(http.StatusOK, data)
}

type GroupUpdateRequest struct {
	ID        int    `json:"id"`
	GroupName string `json:"group_name"`
	GroupAdmin string `json:"group_admin"`
}

func GroupUpdate(c *gin.Context) {
	var req GroupUpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()

	// query := "INSERT INTO logins (id, name, password) VALUES ($1, $2, $3)"
	query := "UPDATE `groups` SET group_name = ?, admin= ? WHERE id = ?"
	_, err = dbConn.Exec(query,  req.GroupName, req.GroupAdmin, req.ID)
	if err != nil {
		fmt.Println("66 err",err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Group Infos updeted successfully"})
}

type GroupDeleteRequest struct {
	ID        int    `json:"id"`
	
}

func GroupDelete(c *gin.Context) {
	var req GroupUpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()

	// query := "INSERT INTO logins (id, name, password) VALUES ($1, $2, $3)"
	query := "DELETE FROM `groups` WHERE id = ?"
	_, err = dbConn.Exec(query, req.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Group Infos updeted successfully"})
}

type GroupInsertRequest struct {
	
	GroupName string `json:"group_name"`
	GroupAdmin string `json:"group_admin"`
}

func GroupInsert(c *gin.Context) {
	var req GroupInsertRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	fmt.Println("114")
	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()
	fmt.Println("121", req.GroupName, req.GroupAdmin)
	// query := "INSERT INTO logins ( name, password) VALUES ($1, $2, $3)"
	query := "INSERT INTO `groups` (group_name, admin) VALUES (?, ?);"
	fmt.Println("124")
	_, err = dbConn.Exec(query,  req.GroupName, req.GroupAdmin)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		fmt.Println("128 err",err)
		return
	}
	fmt.Println("130")
	c.JSON(http.StatusOK, gin.H{"message": "New Group Created..."})
}



type GroupMountRequest struct {
	ID        int    `json:"id"`
	
}
func GroupMount(c *gin.Context) {

	var req GroupMountRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	fmt.Println("149")
	dbConn, err := db.ConnectDB()
	if err != nil {
		fmt.Println("152 err",err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()

	query := "SELECT id, group_name, admin FROM `groups` where id = ?"
	rows, err := dbConn.Query(query, req.ID)
	fmt.Println("160")
	if err != nil {
		fmt.Println("162 err",err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}
	defer rows.Close()
	fmt.Println("167")
	var data []map[string]interface{}
	for rows.Next() {
		var id int
		var group_name,admin string
		err := rows.Scan(&id, &group_name, &admin)
		if err != nil {
			fmt.Println("174 err",err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read row"})
			return
		}
		data = append(data, map[string]interface{}{"id":id,"group_name": group_name, "group_admin": admin})
	}
	fmt.Println("180")
	c.JSON(http.StatusOK, data)
}
