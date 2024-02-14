CREATE OR REPLACE PACKAGE BODY project_points_pkg IS

    PROCEDURE assign_yield_points IS
        cursor c_holdings is
            select h.id as holding_id, h.wallet, py.project_id, py.points_yielded, w.id as wallet_id
            from holdings h
            join project_yield py on py.id = h.project_yield_id
            join wallet w on w.address = h.wallet;
            
        v_points_exist NUMBER;
        v_points NUMBER;
    BEGIN
        FOR rec IN c_holdings LOOP
            -- Check if a record exists in the points table for the given wallet and project
            SELECT COUNT(*)
            INTO v_points_exist
            FROM points
            WHERE wallet_id = rec.wallet_id AND project_id = rec.project_id;
            
            IF v_points_exist = 0 THEN
                -- Insert a new record if it doesn't exist
                INSERT INTO points(wallet_id, project_id, points, created, created_by, updated, updated_by)
                VALUES(rec.wallet_id, rec.project_id, rec.points_yielded, SYSDATE, 'SYSTEM', SYSDATE, 'SYSTEM');
            ELSE
                -- Update the existing record by adding the new points
                UPDATE points
                SET points = points + rec.points_yielded, updated = SYSDATE, updated_by = 'SYSTEM'
                WHERE wallet_id = rec.wallet_id AND project_id = rec.project_id;
            END IF;
            
            -- Log the points update or insert operation
            INSERT INTO points_log(points_id, old_points, new_points, created, created_by, updated, updated_by)
            VALUES((SELECT id FROM points WHERE wallet_id = rec.wallet_id AND project_id = rec.project_id),
                   NULL, -- This could be enhanced to fetch the previous points value if needed
                   TO_CHAR(rec.points_yielded), SYSDATE, 'SYSTEM', SYSDATE, 'SYSTEM');
            
            -- Commit the transaction to ensure data integrity
            COMMIT;
        END LOOP;
    END assign_yield_points;

END project_points_pkg;
/
