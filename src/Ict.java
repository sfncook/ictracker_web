
import java.io.IOException;
import java.net.URL;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.Region;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import javafx.stage.Screen;
import javafx.geometry.Rectangle2D;
import javafx.collections.ListChangeListener;
import javafx.scene.Node;
import java.util.Set;
import static javafx.application.Application.launch;
import java.util.Scanner;  
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.application.Platform;
import javafx.event.EventHandler;
import javafx.scene.web.WebEvent;
import javafx.stage.WindowEvent;
import netscape.javascript.JSObject;

 
public class Ict extends Application {
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Thread t = new Thread(() -> {
            Acme.Serve.Main.main(new String[]{"-a","aliases.properties","-p","8080","-l"});
        });
        t.start();
        launch(args);
    }
     
    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("ICT");
     
        WebView webView = new WebView();
        WebEngine webEngine = webView.getEngine();
        String html = "http://localhost:8080/html/splash.html";
        webEngine.load(html);
        
        webEngine.setOnAlert(new EventHandler<WebEvent<String>>() {
            @Override
            public void handle(WebEvent<String> t) {
                System.out.println("Alert: "+t.getData());
            }
        });
        
        //Set window size
        Screen screen = Screen.getPrimary();
        Rectangle2D bounds = screen.getVisualBounds();
        Scene scene = new Scene(webView, bounds.getWidth(), bounds.getHeight());
        primaryStage.setX(0);
        primaryStage.setY(0);
        primaryStage.setWidth(bounds.getWidth());
        primaryStage.setHeight(bounds.getHeight());
        
        webView.setPrefWidth(bounds.getWidth());
        webView.setPrefHeight(bounds.getHeight()-30);
        
        primaryStage.setScene(scene);
        primaryStage.show();
        
        primaryStage.setOnCloseRequest((WindowEvent t) -> {
            Platform.exit();
            try {
                Acme.Serve.Main.stop();
            } catch (IOException ex) {
                Logger.getLogger(Ict.class.getName()).log(Level.SEVERE, null, ex);
            }
        });
        
        Platform.runLater(new Runnable() {
            @Override
            public void run() {
                JSObject window = (JSObject) webEngine.executeScript("window");
                window.setMember("ictJavaCode", this);
            }
            
            public void test() {
                System.out.println("runnable.test()");
            }
        });
        
    }
    
    public void renderPdf() {
        System.out.println("Ict.renderPdf()");
    }
    
}