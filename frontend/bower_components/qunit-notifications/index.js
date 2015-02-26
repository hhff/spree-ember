QUnit.notifications = function(options) {
  options         = options         || {};
  options.icons   = options.icons   || {};
  options.timeout = options.timeout || 4000;
  options.titles  = options.titles  || { passed: 'Passed!', failed: 'Failed!' };
  options.bodies  = options.bodies  || { passed: '{{passed}} of {{total}} passed', failed: '{{passed}} passed. {{failed}} failed.' };

  var renderBody = function(body, details) {
    ['passed', 'failed', 'total', 'runtime'].forEach(function(type) {
      body = body.replace("{{"+type+"}}", details[type]);
    });

    return body;
  };

  if (window.Notification) {
    QUnit.done(function(details) {
      var title;
      var _options = {};

      if (window.Notification && QUnit.urlParams.notifications) {
        if (details.failed === 0) {
          title = options.titles.passed;
          _options.body = renderBody(options.bodies.passed, details);

          if (options.icons.passed) {
            _options.icon = options.icons.passed;
          }
        } else {
          title = options.titles.failed;
          _options.body = renderBody(options.bodies.failed, details);

          if (options.icons.failed) {
            _options.icon = options.icons.failed;
          }
        }

        var notifications = new window.Notification(title, _options);

        setTimeout(function() {
          notifications.close();
        }, options.timeout);
      }
    });

    QUnit.begin(function() {
      var toolbar      = document.getElementById('qunit-testrunner-toolbar');
      var notification = document.createElement( "input" );

      notification.type = "checkbox";
      notification.id   = "qunit-notifications";

      if (QUnit.urlParams.notifications) {
        notification.checked = true;
      }

      notification.addEventListener('click', function(event) {
        if (event.target.checked) {
          window.Notification.requestPermission(function(status) {
            window.location = QUnit.url({notification: true});
          });
        } else {
          window.location = QUnit.url({notification: undefined});
        }
      }, false);
      toolbar.appendChild(notification);

      var label       = document.createElement('label');
      label.innerHTML = "Notifications";
      label.setAttribute( "for", "qunit-notifications" );
      label.setAttribute( "title", "Show notifications." );
      toolbar.appendChild(label);
    });
  }
};
